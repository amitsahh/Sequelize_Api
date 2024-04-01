"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { Cookie } from 'next/font/google';
// import Cookies from 'js-cookie';
// import Cookies from "universal-cookie";

const Page = () => {
  // const cookies = new Cookies();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passworderr, setPassworderr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailerr("");
    setPassworderr("");

    try {
      const response = await axios.post("http://localhost:7000/login", data);
      console.log("Response:", response.data);

      // Extract token from the response
      // const { token } = response.data;
      // const { user, token } = response.data;
      // cookies.set('token', token, { expires: 1 });
      // Set the token in cookies
      // document.cookie = `token=${token}; path=/todos`; // Set the cookie with path

      //    const { token } = response.data;

      // Store token in localStorage
      // localStorage.setItem('token', token);

      // console.log("Cookie:", document.cookie);
      setErrorMessage(""); // Clear any previous error message
      setSuccessMessage("Login successful!"); // Set success message
      router.push("/todos");
    } catch (error) {
      if (error.response.status === 401) {
        setEmailerr("email is wrong");
      }
      if (error.response.status === 402) {
        setPassworderr("password is wrong");
      }
      console.log(error.message);
      setErrorMessage("Incorrect email or password"); // Set error message for login failure
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-md p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800">
            Email
          </label>
          <input
            required
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
            placeholder="Enter your email"
          />
          {emailerr && <h2 className="text-red-500 mt-2">{emailerr}</h2>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-800">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
            placeholder="Enter your password"
          />
          {passworderr && <h2 className="text-red-500 mt-2">{passworderr}</h2>}
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          Login
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Page;
