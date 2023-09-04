"use client";

import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";

type ProvidersProps = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function ProviderList({ providers }: ProvidersProps) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "http://localhost:3000/m",
                })
              }
              className="flex items-center justify-center my-2 transition duration-200 border bg-white dark:bg-transparent border-gray-200 text-gray-500 dark:text-gray-100 w-full py-2.5 rounded text-base shadow-sm hover:shadow-md font-normal text-center"
            >
              {provider.id === "google" && <FcGoogle className="mr-2" />}
              {provider.id === "github" && <GoMarkGithub className="mr-2" />}
              {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export default ProviderList;
