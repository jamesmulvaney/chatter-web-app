import ChatBox from "./ChatBox";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { notFound, redirect } from "next/navigation";
import { MessagesWithAuthor } from "../../../utils/types";
import { headers } from "next/headers";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params }: ChatPageProps) {
  //Check for session
  const session = await getServerSession(authOptions);

  if (session && !session.user?.username) {
    redirect("/auth/username");
  }

  if (!session) {
    redirect("/auth/signin");
  }

  //Initial fetch for chat messages
  const getMessages = await fetch(
    `${process.env.BASE_URL}/api/chat/getChatMessages?cid=${params.chatId}`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        cookie: headers().get("cookie"),
      },
    }
  ).then((res) => res.json());
  const messages: MessagesWithAuthor[] = getMessages.messages;

  if (!getMessages.success) notFound();

  return (
    <ChatBox
      session={session}
      chatId={params.chatId}
      serverFetchedMessages={messages}
    />
  );
}

export default ChatPage;
