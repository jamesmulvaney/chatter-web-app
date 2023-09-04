"use client";

import React from "react";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white py-2 px-3 rounded text-sm shadow-sm hover:shadow-md font-semibold"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
