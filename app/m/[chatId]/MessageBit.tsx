"use client";

import Image from "next/image";
import React from "react";
import TimeAgo from "react-timeago";
import dayjs from "dayjs";

type MessageBitProps = {
  isAuthor: boolean;
  body: string;
  createdAt: Date;
  avatar: string;
};

function timeAgoFormatter(
  value: number,
  unit: TimeAgo.Unit,
  suffix: TimeAgo.Suffix,
  createdAt: Date
) {
  if (unit === "week" || unit === "month" || unit === "year") {
    return dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss");
  }
  return `${value} ${unit}${value !== 1 ? "s" : ""} ${suffix}`;
}

function MessageBit({ isAuthor, body, createdAt, avatar }: MessageBitProps) {
  const authorBit = (
    <div className="flex flex-row items-center justify-end space-x-2 mb-3">
      <p className="text-xs font-light text-gray-600 dark:text-gray-300">
        <TimeAgo
          date={createdAt}
          formatter={(value, unit, suffix) => {
            return timeAgoFormatter(value, unit, suffix, createdAt);
          }}
        />
      </p>
      <p className="bg-gray-200 dark:bg-gray-800 rounded-lg font-light text-md py-2 px-3 max-w-[25vw]">
        {body}
      </p>
      <Image
        src={avatar}
        alt="user avatar"
        height={32}
        width={32}
        className="rounded-full"
      />
    </div>
  );

  const otherBit = (
    <div className="flex flex-row items-center space-x-2 mb-3">
      <Image
        src={avatar}
        alt="user avatar"
        height={32}
        width={32}
        className="rounded-full"
      />
      <p className="bg-gray-200 dark:bg-gray-800 rounded-lg font-light text-md py-2 px-3 max-w-[25vw]">
        {body}
      </p>
      <p className="text-xs font-light text-gray-600 dark:text-gray-300">
        <TimeAgo
          date={createdAt}
          formatter={(value, unit, suffix) => {
            return timeAgoFormatter(value, unit, suffix, createdAt);
          }}
        />
      </p>
    </div>
  );

  return isAuthor ? authorBit : otherBit;
}

export default MessageBit;
