"use client";

import React from "react";
import useSWR from "swr";
import fetcher from "../../../utils/fetchMessages";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Session } from "next-auth";
import { MessagesWithAuthor } from "../../../utils/types";

type ChatInputProps = {
  chatId: string;
  session: Session;
};

function ChatInput({ chatId, session }: ChatInputProps) {
  const { data: messages, mutate } = useSWR(
    `/api/chat/getChatMessages?cid=${chatId}`,
    fetcher
  );

  const setNewMessage = async (values: any) => {
    const res = await fetch("http://localhost:3000/api/chat/newMessage", {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

    const data = await res.json();
    const message: MessagesWithAuthor = data.message;

    return [message, ...messages!];
  };

  const formik = useFormik({
    initialValues: {
      chatId,
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().max(1000).required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      /* 
        Send the new message to the api.

        While waiting for a response, update the message cache so the sent message appears instantly for the sender.
      */
      await mutate(setNewMessage(values), {
        optimisticData: [
          {
            id: "temp-id-129d8ab9vre321",
            authorId: session.user?.id!,
            author: {
              id: session.user?.id!,
              email: session.user?.email!,
              image: session.user?.image!,
              name: session.user?.name!,
              username: session.user?.username!,
              emailVerified: null,
            },
            body: values.message,
            chatSessionId: chatId,
            createdAt: new Date(),
          },
          ...messages!,
        ],
        rollbackOnError: true,
      });

      resetForm();
    },
  });

  return (
    <div className="bottom-0 pb-5 w-[calc(100%_-_(20vw_+_2.50rem))] absolute">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-6 gap-3">
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Enter new message here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="border rounded px-3 py-2 text-sm dark:bg-gray-500 dark:placeholder:text-gray-300 col-span-5"
          />
          <button
            type="submit"
            disabled={!formik.values.message}
            className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white w-full p-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
