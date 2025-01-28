// HrForm.jsx
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const HrForm = () => {
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const photoURLFile = watch("photoURL");

  const handleImageUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData);
      if (res.data.success) {
        setValue(fieldName, res.data.data.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  const onSubmit = (data) => {
    sessionStorage.setItem("hrFormData", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <Helmet>
        <title>Asset Management || HR Form</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-5">Register HR Manager</h1>
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register("companyName", { required: "Company Name is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>

        {/* Company Logo */}
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-gray-700 font-medium mb-2">
            Company Logo
          </label>
          <input
            type="file"
            id="photoURL"
            onChange={(e) => handleImageUpload(e.target.files[0], "photoURL")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {photoURLFile && <p className="text-green-500 text-sm">Logo selected</p>}
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            {...register("dob")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Select Package */}
        <div className="mb-4">
          <label htmlFor="package" className="block text-gray-700 font-medium mb-2">
            Select a Package
          </label>
          <select
            id="package"
            {...register("package", { required: "Package selection is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Select a package</option>
            <option value="basic">5 Members for $5</option>
            <option value="standard">10 Members for $8</option>
            <option value="premium">20 Members for $15</option>
          </select>
          {errors.package && <p className="text-red-500 text-sm">{errors.package.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default HrForm;
