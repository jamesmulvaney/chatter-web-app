import React from "react";

type NotFoundProps = {};

function NotFound({}: NotFoundProps) {
  return (
    <div className="text-center mt-96">
      <h1 className="text-3xl font-semibold">Whoops, chat not found...</h1>
      <p className="text-xl font-light">
        Try clicking the user's name again, or restart your chat session with
        them.
      </p>
    </div>
  );
}

export default NotFound;
