import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/myAssets")
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the assets!", error);
      });
  }, []);

  const handleReturn = (id) => {
    console.log(`Return asset with id: ${id}`);
    // Implement the return functionality here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">My Assets</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-3 text-left">Assets Name</th>
              <th className="p-3 text-left">Assets Type</th>
              <th className="p-3 text-left">Request Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id} className="border-b">
                <td className="p-3">{asset.assetName}</td>
                <td className="p-3">{asset.assetType}</td>
                <td className="p-3">
                  {new Date(asset.requestDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`badge ${
                      asset.status === "approved"
                        ? "badge-success"
                        : asset.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </span>
                </td>
                <td className="p-3">
                  {asset.status === "approved" && (
                    <button
                      onClick={() => handleReturn(asset._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
