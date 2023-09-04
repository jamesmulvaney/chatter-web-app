import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import AuthError from "./AuthError";

async function ChatPage() {
  //Check for session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  if (session && !session.user?.username) {
    redirect("/auth/username");
  }

  return (
    <div className="w-[85vw] h-[calc(100vh_-_75px)] p-5 ">
      <div className="text-center mt-96">
        <h1 className="text-3xl font-semibold">No chat selected...</h1>
        <p className="text-xl font-light">
          Select a recent chat, or start a new one, at the sidebar to the left!
        </p>
      </div>
    </div>
  );
}

export default ChatPage;
