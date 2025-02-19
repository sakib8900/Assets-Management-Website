import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import pending from "../../assets/employee/pending.jpeg";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

const PendingReqBanner = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get("https://asset-management-system-server-one.vercel.app/myAssets")
        .then((response) => {
          const userPendingRequests = response.data.filter(
            (asset) => asset.requesterEmail === user.email && asset.status === "pending"
          );
          setPendingRequests(userPendingRequests);
        })
        .catch((error) => {
          console.error("Error fetching pending requests:", error);
        });
    }
  }, [user]);

  return (
    <div className="p-4 rounded-md shadow-md mx-auto max-w-3xl">
      <SharedTitle heading="Your Pending Request List"></SharedTitle>

      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 rounded-md bg-gray-100 p-4">
        {/* Image */}
        <div className="flex-shrink-0 mb-3 md:mb-0">
          <img src={pending} alt="pending" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
        </div>

        {/* Pending Requests List */}
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-yellow-700">Pending Requests</h2>
          {pendingRequests.length > 0 ? (
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {pendingRequests.map((asset) => (
                <li key={asset._id} className="mb-2">
                  <span className="font-semibold">{asset.assetName}</span> - Requested on{" "}
                  <span className="text-gray-600">{new Date(asset.requestDate).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No pending requests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingReqBanner;
