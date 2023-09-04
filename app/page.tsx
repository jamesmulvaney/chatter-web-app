import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div>
      <div className="flex flex-col items-center pt-40">
        <h1 className="font-extrabold text-6xl">Get Chatting...</h1>
        <p className="my-10 text-xl font-light">
          Chatter is a modern chat application built for the web. Join now and
          connect with your friends!
        </p>
        <div>
          <Link
            href="/auth/signin"
            className="py-2 px-3 mr-4 rounded font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
