import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header>
      <div className="flex flex-col items-center px-10 py-4 border-b border-zinc-300/50 dark:border-white/10 dark:bg-gray-900">
        <div className="container flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo/logo-light.png"
              alt="Chatter Logo"
              height={42}
              width={175}
              className="dark:hidden"
              priority
            />
            <Image
              src="/logo/logo-dark.png"
              alt="Chatter Logo"
              height={42}
              width={175}
              className="hidden dark:block"
              priority
            />
          </Link>
          <div>
            {!session ? (
              <Link
                href="/auth/signin"
                className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white py-2 px-3 rounded text-sm shadow-sm hover:shadow-md font-semibold"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex flex-row space-x-5">
                <div className="flex flex-row space-x-2 items-center invisible sm:visible">
                  <Image
                    src={session.user?.image!}
                    alt="x's avatar"
                    height={32}
                    width={32}
                    className="rounded-full bg-gray-800"
                  />
                  <div className="flex flex-col space-y-1 items-start">
                    <p className="text-lg font-semibold leading-3">
                      {session.user?.name}
                    </p>
                    <p className="text-sm font-light text-gray-500 leading-3">
                      @{session.user?.username || "chooseAUsername"}
                    </p>
                  </div>
                </div>
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
