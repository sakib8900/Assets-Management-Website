import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const HrForm = () => {
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setValue(fieldName, data.data.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  const companyLogoFile = watch("companyLogo");
  const userImageFile = watch("userImage");

  // Submit handler
  const onSubmit = async (formData) => {
    const {
      fullName,
      companyName,
      companyLogo,
      userImage,
      email,
      password,
      dob,
      package: selectedPackage,
    } = formData;

    const payload = {
      fullName,
      companyName,
      companyLogo,
      userImage,
      email,
      dob,
      selectedPackage,
    };
    console.log(payload);
    try {
      setIsLoading(true);
      await createUser(email, password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User registered successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      console.log("Form Data:", payload);
    } catch (error) {
      // console.error("Error creating user:", error.message);
      // alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <label htmlFor="companyLogo" className="block text-gray-700 font-medium mb-2">
            Company Logo
          </label>
          <input
            type="file"
            id="companyLogo"
            onChange={(e) => handleImageUpload(e.target.files[0], "companyLogo")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {companyLogoFile && (
            <p className="text-green-500 text-sm">Company Logo selected for upload</p>
          )}
        </div>

        {/* User Image */}
        <div className="mb-4">
          <label htmlFor="userImage" className="block text-gray-700 font-medium mb-2">
            User Image
          </label>
          <input
            type="file"
            id="userImage"
            onChange={(e) => handleImageUpload(e.target.files[0], "userImage")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {userImageFile && (
            <p className="text-green-500 text-sm">User Image selected for upload</p>
          )}
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
              pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/
          })}
              placeholder="password" className="input input-bordered" />
          {errors.password?.type === 'required' && <p
              className='text-red-600'>Password is required</p>}
          {errors.password?.type === 'maxLength' && <p
              className='text-red-600'>Password must be less then 20 characters</p>}
          {errors.password?.type === 'minLength' && <p
              className='text-red-600'>Password must be 6 characters</p>}
          {errors.password?.type === 'pattern' && <p
              className='text-red-600'>Password must have one lower case and one higher case characters</p>}
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
            <option value="" disabled>
              Select a package
            </option>
            <option value="basic">5 Members for $5</option>
            <option value="standard">10 Members for $8</option>
            <option value="premium">20 Members for $15</option>
          </select>
          {errors.package && <p className="text-red-500 text-sm">{errors.package.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-2 ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-md transition`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HrForm;
