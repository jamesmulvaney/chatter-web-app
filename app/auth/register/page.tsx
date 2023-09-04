import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="max-w-xl flex flex-col justify-center sm:py-12 mx-auto">
      <div className="min-w-full p-9 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-4xl mb-2 dark:text-gray-100">
          Register a Chatter Account
        </h1>
        <p className="text-center mb-4 dark:text-gray-400">
          Already have an account?
          <Link href="/auth/signin"> Click here</Link> to sign in.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 shadow w-full rounded">
          <div className="px-5 py-7">
            <h1 className="font-bold text-center dark:text-gray-100">
              Credential registration is currently disabled.
            </h1>
            <p className="font-light text-center mb-2 dark:text-gray-100">
              Please sign in through an oauth provider such as Google.
            </p>
            <RegisterForm />
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

export default Register;
