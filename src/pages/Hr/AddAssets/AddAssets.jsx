import React, { useState } from "react";

const AddAssets = () => {
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
      const response = await fetch("http://localhost:5000/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.insertedId) {
        alert("Asset added successfully!");
        setFormData({ name: "", type: "Non-returnable", quantity: 0, addedDate: "" });
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
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
