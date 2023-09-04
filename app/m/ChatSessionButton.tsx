"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type ChatSessionButtonProps = {
  chatId: string;
  name: string;
  avatar: string;
};

function ChatSessionButton({ chatId, name, avatar }: ChatSessionButtonProps) {
  return (
    <Link
      className="flex flex-row items-center space-x-2 p-2 mb-3 w-full rounded-lg bg-gray-200 hover:bg-gray-300 focus:shadow-sm focus:outline-gray-400 dark:bg-gray-800 hover:dark:bg-gray-700 transition-colors"
      href={`/m/${chatId}`}
    >
      <Image
        src={avatar}
        alt={`${name}'s avatar`}
        height={32}
        width={32}
        className="rounded-full"
      />
      <p className="font-light text-lg">{name}</p>
    </Link>
  );
}

export default ChatSessionButton;
