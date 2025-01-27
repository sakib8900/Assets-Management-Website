import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeForm = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const {
      fullName,
      email,
      password,
      dob
    } = formData;

    const payload = {
      fullName,
      email,
    };

    try {
      setIsLoading(true);
      await createUser(email, password);
      await updateUserProfile(fullName)

      const response = await fetch("http://localhost:5000/employeeJoinReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "employee registered successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/")
      } else {
        throw new Error(result.message || "Failed to save Employee request")
      }
    } catch (error) {
      console.error("error creating user:", error.message);
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <Helmet>
        <title>Assets Management || EmployeeForm</title>
      </Helmet>
      {/* Form Section */}
      <h1 className="text-2xl font-bold text-center mb-6">Register New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.type === "required"
                ? "Password is required"
                : errors.password.type === "minLength"
                  ? "Password must be at least 6 characters"
                  : errors.password.type === "pattern"
                    ? "Password must include uppercase, lowercase, number, and special character"
                    : ""}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
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