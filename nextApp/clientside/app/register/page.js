"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    mobile: "",
    gender: "",
    country: "",
    hobbies: [],
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileex, setMobileex] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usererr, setUsererr] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:
        name === "hobbies"
          ? value.split(",").map((hobby) => hobby.trim())
          : value,
    });
  };

  const signin = () => {
    router.push("/login");
  };

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         // Code to execute after 30 seconds
  //         handleSubmit();
  //         router.push('/login');
  //         console.log('This code executes after 30 seconds');
  //     }, 5000); // 30 seconds in milliseconds

  //     return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect runs again
  // }, []);

  // useEffect(() => {
  //     if (success) {
  //         router.push('/login');
  //     }
  // }, [success],30000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMobile("");
    setMobileex("");
    setEmailError("");
    setUsererr("");

    //     useEffect(() => {
    //         router.push('/login')

    //    }, []);

    try {
      const response = await axios.post("http://localhost:7000/users", data);
      console.log("success");
      setSuccess("account created successfully..");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.log("heloo", error);
      if (error.response.status === 400) {
        setMobile("Mobile number must be 10 digits");
      }
      if (error.response.status === 501) {
        setMobileex("Mobile number already exists");
      }
      if (error.response.status === 600) {
        setEmailError("Email already exists");
      }
      if (error.response.status === 502) {
        setUsererr("User already exists");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold text-center mb-4 text-red-500">
          User Registration
        </h1>
        {success && <div className=" bg-red-700">{success} </div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-white" htmlFor="name">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="mobile">
                Mobile
              </label>
              <input
                required
                type="text"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Mobile"
              />
              {mobile && <p className="text-red-500 text-sm mt-1">{mobile}</p>}
              {mobileex && (
                <p className="text-red-500 text-sm mt-1">{mobileex}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="gender">
                Gender
              </label>
              <input
                required
                type="text"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Gender"
              />
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="country">
                Country
              </label>
              <input
                required
                type="text"
                name="country"
                value={data.country}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="hobbies">
                Hobbies
              </label>
              <input
                required
                type="text"
                name="hobbies"
                value={data.hobbies.join(", ")}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Hobbies (comma-separated)"
              />
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="email">
                Email
              </label>
              <input
                required
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-white" htmlFor="password">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Register
            </button>
            {usererr && <p className="text-red-500 text-sm mt-1">{usererr}</p>}
          </div>
        </form>
        <span className="text-red-500 text-sm mt-1">already user ?.....</span>
        <button onClick={signin} className="text-red-500 text-sm mt-1">
          sign in
        </button>
      </div>
    </div>
  );
};

export default Page;
