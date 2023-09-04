"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetchChatSessions";
import { ChatSessionFull } from "../../utils/types";
import ChatSessionButton from "./ChatSessionButton";
import NewChatModal from "./NewChatModal";

type SideBarChatsProps = {
  session: Session;
  serverFetchedChatSessions: ChatSessionFull[];
};

function SideBarChats({
  session,
  serverFetchedChatSessions,
}: SideBarChatsProps) {
  //Client side fetch for chat sessions
  const { data: chatSessions } = useSWR(`/api/chat/getChatSessions`, fetcher);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="mb-5">
        <p className="font-semibold">Recent Chats</p>
      </div>
      <div className="mb-10">
        {(chatSessions || serverFetchedChatSessions).length >= 1 ? (
          (chatSessions || serverFetchedChatSessions).map((x) => {
            return x.users!.map((y, index) => {
              if (session.user?.id !== y.id) {
                return (
                  <ChatSessionButton
                    chatId={x.id}
                    name={y.name!}
                    avatar={y.image!}
                    key={index}
                  />
                );
              }
            });
          })
        ) : (
          <p>No chats found...</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setModalIsOpen(true)}
        className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block">Start New Chat</span>
      </button>
      <NewChatModal
        session={session}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
}

export default SideBarChats;
