import { MessagesWithAuthor } from "./types";

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });

  const data = await res.json();
  const messages: MessagesWithAuthor[] = data.messages;

  return messages;
};

export default fetcher;
