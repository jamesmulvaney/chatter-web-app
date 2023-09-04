import React from "react";

async function ChatLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-[80vw] h-[calc(100vh_-_75px)] p-5">{children}</div>;
}

export default ChatLayout;
