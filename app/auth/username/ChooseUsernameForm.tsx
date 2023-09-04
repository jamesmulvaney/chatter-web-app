"use client";

import { useFormik } from "formik";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

type ChooseUsernameFormProps = {
  session: Session;
};

function ChooseUsernameForm({ session }: ChooseUsernameFormProps) {
  const router = useRouter();

  //Use formik to handle the form submission
  const formik = useFormik({
    initialValues: {
      userId: session.user?.id,
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(24).required("Required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      console.log(values);
      const res = await fetch("http://localhost:3000/api/chat/newUsername", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/m");
      } else {
        setFieldError("username", data.reason);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="font-semibold text-sm text-gray-700 dark:text-gray-100 pb-1 block">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="John Doe"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-gray-500 dark:placeholder:text-gray-300"
      />
      {formik.touched.username && formik.errors.username ? (
        <div className="font-semibold text-xs -mt-4 mb-2 text-red-600 dark:text-red-400">
          {formik.errors.username}
        </div>
      ) : null}
      <button
        type="submit"
        className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block mr-1">Submit</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </form>
  );
}

export default ChooseUsernameForm;
