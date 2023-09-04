import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import ChooseUsernameForm from "./ChooseUsernameForm";

async function ChooseUsername() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.username) {
    redirect("/m");
  }

  return (
    <div className="max-w-xl flex flex-col justify-center sm:py-12 mx-auto">
      <div className="min-w-full p-9 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-4xl mb-2 dark:text-gray-100">
          Choose a cool username...
        </h1>
        <p className="text-center mb-4 dark:text-gray-400">
          A username is required to use this application. Please choose one
          below
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 shadow w-full rounded">
          <div className="px-5 py-7">
            <ChooseUsernameForm session={session} />
          </div>
        </div>
        <div className="py-5 mt-2">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <Link
                href="/"
                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded text-gray-500 hover:bg-gray-200 hover:dark:bg-indigo-600 focus:outline-none focus:bg-gray-300 focus:dark:bg-indigo-700 focus:ring-2 focus:ring-gray-400 focus:dark:ring-indigo-500 focus:ring-opacity-50 ring-inset"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top dark:text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="inline-block ml-1 dark:text-gray-100 font-bold">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUsername;
