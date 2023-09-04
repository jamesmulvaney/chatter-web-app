import React from "react";
import ChatLoadingSkeletonMessage from "./ChatLoadingSkeletonMessage";

function ChatLoadingSkeleton() {
  return (
    <div className="h-[82vh] overflow-y-auto scroll flex flex-col-reverse animate-pulse">
      {/* Fake Messages */}
      <ChatLoadingSkeletonMessage position="left" />
      <ChatLoadingSkeletonMessage position="right" />
      <ChatLoadingSkeletonMessage position="right" />
      <ChatLoadingSkeletonMessage position="right" />
      <ChatLoadingSkeletonMessage position="left" />
      <ChatLoadingSkeletonMessage position="left" />
      <ChatLoadingSkeletonMessage position="right" />
      {/* Fake Input Box */}
      <div className="bottom-0 pb-5 w-[calc(100%_-_(20vw_+_2.50rem))] absolute">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-5 rounded-lg bg-slate-300 dark:bg-slate-700 h-12"></div>
          <div className="col-span-1 rounded-lg bg-slate-300 dark:bg-slate-700 h-12"></div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoadingSkeleton;
