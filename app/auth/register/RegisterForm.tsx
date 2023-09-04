"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function RegisterForm() {
  //Use formik to handle the form submission
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(100, "Passwords can only be 100 characters or less")
        .required(),
      confirmPassword: Yup.string()
        .max(100, "Passwords can only be 100 characters or less")
        .required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="font-semibold text-sm text-gray-700 dark:text-gray-100 pb-1 block">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-gray-500 dark:placeholder:text-gray-300"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="font-semibold text-xs -mt-4 mb-2 text-red-600 dark:text-red-400">
          {formik.errors.email}
        </div>
      ) : null}
      <label className="font-semibold text-sm text-gray-700 dark:text-gray-100 pb-1 block">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="***********"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-gray-500 dark:placeholder:text-gray-300"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="font-semibold text-xs -mt-4 mb-2 text-red-600 dark:text-red-400">
          {formik.errors.password}
        </div>
      ) : null}
      <label className="font-semibold text-sm text-gray-700 dark:text-gray-100 pb-1 block">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="***********"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-gray-500 dark:placeholder:text-gray-300"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="font-semibold text-xs -mt-4 mb-2 text-red-600 dark:text-red-400">
          {formik.errors.confirmPassword}
        </div>
      ) : null}
      <button
        type="submit"
        disabled
        className="transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 hover:dark:bg-indigo-700 focus:bg-blue-700 focus:dark:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:dark:ring-indigo-500 focus:ring-opacity-50 text-white py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold w-full text-center inline-block"
      >
        <span className="inline-block mr-1">Register</span>
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

export default RegisterForm;
