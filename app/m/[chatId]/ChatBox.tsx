"use client";

import ChatInput from "./ChatInput";
import MessageBit from "./MessageBit";
import useSWR from "swr";
import fetcher from "../../../utils/fetchMessages";
import React, { useEffect } from "react";
import { Session } from "next-auth";
import { MessagesWithAuthor } from "../../../utils/types";
import { pusherClient } from "../../../lib/pusher";

type ChatBoxProps = {
  session: Session;
  chatId: string;
  serverFetchedMessages: MessagesWithAuthor[];
};

function ChatBox({ session, chatId, serverFetchedMessages }: ChatBoxProps) {
  //Fetch chat session messages
  const { data: messages, mutate } = useSWR(
    `/api/chat/getChatMessages?cid=${chatId}`,
    fetcher
  );

  /* 
    Subscribe to the pusher channel corresponding with the chatId.
    Allows users to send and recieve messages without the page reloading.

    Unsubscribe when the component unmounts to prevent stale connections.
  */
  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);

    channel.bind("new-message", async (data: MessagesWithAuthor) => {
      //Return if the incomming messae is send by the current user. This prevents duplicate messages appearing.
      if (data.authorId === session.user?.id) return;

      if (!messages) {
        mutate(fetcher(`/api/chat/getChatMessages?cid=${chatId}`));
      } else {
        mutate(fetcher(`/api/chat/getChatMessages?cid=${chatId}`), {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="h-[82vh] overflow-y-auto scroll flex flex-col-reverse">
        {(messages || serverFetchedMessages).length > 0 ? (
          (messages || serverFetchedMessages).map(
            (message: MessagesWithAuthor) => (
              <MessageBit
                isAuthor={message.authorId === session.user?.id ? true : false}
                body={message.body}
                createdAt={message.createdAt}
                avatar={message.author.image!}
                name={message.author.name!}
                key={message.id}
              />
            )
          )
        ) : (
          <div className="text-center mb-96">
            <h1 className="text-3xl font-semibold">It's empty in here...</h1>
            <p className="text-xl font-light">
              Be the first to send a message!
            </p>
          </div>
        )}
      </div>
      <ChatInput session={session} chatId={chatId} />
    </>
  );
}

export default ChatBox;
