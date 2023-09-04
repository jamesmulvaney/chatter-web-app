import { ChatSessionFull } from "./types";

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });

  const data = await res.json();
  const chatSessions: ChatSessionFull[] = data.chatSessions;

  return chatSessions;
};

export default fetcher;
