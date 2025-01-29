import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const AddAssets = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    type: "Non-returnable",
    quantity: 0,
    addedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "quantity" ? Number(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosSecure.post("/assets", formData);

      if (response.data.insertedId) {
        Swal.fire("Add Asset", "Asset added successfully!", "success");
        setFormData({ name: "", type: "Non-returnable", quantity: 0, addedDate: "" });
        navigate("/assets");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      Swal.fire("Error", "Failed to add the asset. Please try again.", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <Helmet>
                <title>Asset Management || Add Assets</title>
            </Helmet>
      <h2 className="text-2xl font-bold text-center mb-6">Add New Asset</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Asset Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter asset name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Type Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Asset Type</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Non-returnable">Non-returnable</option>
            <option value="Returnable">Returnable</option>
          </select>
        </div>

        {/* Quantity Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="input input-bordered w-full"
          />
        </div>

        {/* Added Date Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Added Date</span>
          </label>
          <input
            type="date"
            name="addedDate"
            value={formData.addedDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssets;
