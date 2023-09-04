import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { ChatSessionFull } from "../../utils/types";
import { headers } from "next/headers";
import SideBarChats from "./SideBarChats";

async function MainAppLayout({ children }: { children: React.ReactNode }) {
  //Check for session
  const session = await getServerSession(authOptions);

  if (!session) {
    return <section>{children}</section>;
  }

  //Initial fetch for side bar
  const getChatSessions = await fetch(
    `http://localhost:3000/api/chat/getChatSessions`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        cookie: headers().get("cookie"),
      },
    }
  ).then((res) => res.json());
  const chatSessions: ChatSessionFull[] = getChatSessions.chatSessions;

  return (
    <div className="flex flex-row justify-start">
      {/* Side Bar */}
      <div className="w-[20vw] h-[calc(100vh_-_75px)] p-5 border-r border-zinc-300/50 dark:border-white/10">
        {/*@ts-ignore*/}
        <SideBarChats
          session={session}
          serverFetchedChatSessions={chatSessions}
        />
      </div>
      {children}
    </div>
  );
}

export default MainAppLayout;
