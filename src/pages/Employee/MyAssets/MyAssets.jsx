import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FiCornerUpLeft } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get("https://asset-management-system-server-one.vercel.app/myAssets")
        .then((response) => {
          const userAssets = response.data.filter(
            (asset) => asset.requesterEmail === user.email
          );
          setAssets(userAssets);
        })
        .catch((error) => {
          console.error("There was an error fetching the assets!", error);
        });
    }
  }, [user]);

  const handleReturn = (id) => {
    console.log(`Return asset with id: ${id}`);
    // TODO: Implement return asset logic
    setDisabledButtons((prevDisabled) => [...prevDisabled, id]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">My Assets</h1>
      <table className="table w-full border">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th>#</th>
            <th className="p-3 text-left">Assets Name</th>
            <th className="p-3 text-left">Assets Type</th>
            <th className="p-3 text-left">Request Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset, idx) => (
              <tr key={asset._id} className="border-b">
                <td>{idx + 1}</td>
                <td className="p-3">{asset.assetName}</td>
                <td className="p-3">{asset.assetType}</td>
                <td className="p-3">
                  {new Date(asset.requestDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`badge ${asset.status === "approved"
                        ? "badge-success"
                        : asset.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="p-3">
                  {asset.status === "approved" && (
                    <button
                      onClick={() => handleReturn(asset._id)}
                      disabled={disabledButtons.includes(asset._id)}
                      className={`py-2 px-4 rounded ${disabledButtons.includes(asset._id)
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white"
                        }`}
                    >
                      <FiCornerUpLeft></FiCornerUpLeft>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssets;