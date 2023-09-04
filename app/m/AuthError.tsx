import React from "react";

type AuthErrorProps = {};

function AuthError({}: AuthErrorProps) {
  return (
    <div className="flex flex-col items-center mt-96">
      <h1 className="text-5xl font-semibold mb-2">Authentication Error</h1>
      <p className="text-3xl font-extralight">
        Please Sign In to use this application!
      </p>
    </div>
  );
}

export default AuthError;
