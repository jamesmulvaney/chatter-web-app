import React from "react";

type ChatLoadingSkeletonMessageProps = {
  position: "left" | "right";
};

function ChatLoadingSkeletonMessage({
  position,
}: ChatLoadingSkeletonMessageProps) {
  return position === "left" ? (
    <div className="flex flex-row items-center space-x-2 mb-3">
      <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-8 w-8"></div>
      <div className="rounded-lg bg-slate-300 dark:bg-slate-700 h-8 w-[15vw]"></div>
      <div className="rounded bg-slate-300 dark:bg-slate-700 h-2 w-16"></div>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-end space-x-2 mb-3">
      <div className="rounded bg-slate-300 dark:bg-slate-700 h-2 w-16"></div>
      <div className="rounded-lg bg-slate-300 dark:bg-slate-700 h-8 w-[15vw]"></div>
      <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-8 w-8"></div>
    </div>
  );
}

export default ChatLoadingSkeletonMessage;
