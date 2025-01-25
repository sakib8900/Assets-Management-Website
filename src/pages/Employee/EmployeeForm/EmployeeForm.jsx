import React from "react";
import { Helmet } from "react-helmet";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const EmployeeForm = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <Helmet>
        <title>Assets Management || EmployeeForm</title>
      </Helmet>
      {/* Form Section */}
      <h1 className="text-2xl font-bold text-center mb-6">Register New Employee</h1>
      <form>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Signup Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </div>
      </form>

      {/* Social Login Section */}
      <div className="mt-8">
        <h2 className="text-center text-gray-700 font-medium mb-4">
          Or Signup with
        </h2>
        <div className="flex justify-center gap-6">
          {/* Google */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" size={20} />
            Google
          </button>

          {/* Facebook */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <FaFacebook className="text-blue-600" size={20} />
            Facebook
          </button>

          {/* Github */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <FaGithub className="text-gray-800" size={20} />
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;