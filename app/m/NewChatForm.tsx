import React from "react";
import { useFormik } from "formik";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { NewChatSessionRes } from "../../utils/types";

type NewChatFormProps = {
  session: Session;
};

function NewChatForm({ session }: NewChatFormProps) {
  const router = useRouter();

  //Use formik to handle the form submission
  const formik = useFormik({
    initialValues: {
      userId: session.user?.id,
      targetUsername: "",
    },
    validationSchema: Yup.object({
      targetUsername: Yup.string().required("Username is a required field."),
    }),
    onSubmit: async (values, { setFieldError }) => {
      console.log(values);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/newChatSession`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
        }
      );

      const data: NewChatSessionRes = await res.json();

      if (data.chatSessionId) {
        router.push(`/m/${data.chatSessionId}`);
      } else {
        console.log(data.error?.field);
        setFieldError("targetUsername", data.error?.reason);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="font-semibold text-sm text-gray-700 dark:text-gray-100 pb-1 block">
        Username
      </label>
      <input
        id="targetUsername"
        name="targetUsername"
        type="text"
        placeholder="John Doe"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.targetUsername}
        className={`border-2 rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-gray-500 dark:placeholder:text-gray-300 ${
          formik.touched.targetUsername && formik.errors.targetUsername
            ? "border-red-600 dark:border-red-400"
            : ""
        }`}
      />
      {formik.touched.targetUsername && formik.errors.targetUsername ? (
        <div className="font-semibold text-s -mt-4 mb-5 text-red-600 dark:text-red-400">
          {formik.errors.targetUsername}
        </div>
      ) : null}
      <button
        type="submit"
        className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block mr-1">Create</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </form>
  );
}

export default NewChatForm;
