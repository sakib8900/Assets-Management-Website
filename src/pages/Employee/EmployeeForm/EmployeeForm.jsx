import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EmployeeForm = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [photoURLFile, setPhotoURLFile] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error("Failed to upload image");
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      // Upload image first if there's a file
      let photoURL = null;
      if (photoURLFile) {
        photoURL = await handleImageUpload(photoURLFile);
      }

      // Create user with email and password
      const userCredential = await createUser(formData.email, formData.password);
      
      // Update user profile
      await updateUserProfile(formData.fullName, photoURL);

      // Prepare payload for employee join request
      const payload = {
        displayName: formData.displayName,
        email: formData.email,
        photoURL: photoURL, // Changed from photoURL to image to match backend
        dob: formData.dob
      };

      // Send join request to backend
      const response = await fetch("http://localhost:5000/employeeJoinReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to submit join request");
      }

      const result = await response.json();
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Employee registered successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      navigate("/");
      
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <Helmet>
        <title>Assets Management || EmployeeForm</title>
      </Helmet>
      
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
          {errors.fullName && <p className="text-red-500 text-sm">{errors.displayName.message}</p>}
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
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              pattern: {
                value: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                message: "Password must include uppercase, lowercase, number, and special character"
              }
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Photo Upload */}
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-gray-700 font-medium mb-2">
            Profile Photo
          </label>
          <input
            type="file"
            id="photoURL"
            onChange={(e) => setPhotoURLFile(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {photoURLFile && <p className="text-green-500 text-sm">Photo selected</p>}
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </div>
      </form>

      {/* Social Login Section */}
      <div className="mt-8">
        <h2 className="text-center text-gray-700 font-medium mb-4">
          Or Signup with
        </h2>
        <div className="flex justify-center gap-6">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" size={20} />
            Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <FaFacebook className="text-blue-600" size={20} />
            Facebook
          </button>
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