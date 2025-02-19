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
    <div className="p-4 rounded-md shadow-md mx-auto">
        <SharedTitle heading="your pending request list"></SharedTitle>
      <div className="flex items-center space-x-4 rounded-md bg-yellow-200 p-3">
        {/* Image */}
        <div className="flex-shrink-0">
          <img src={pending} alt="pending" className="w-24 h-24 md:w-32 md:h-32 object-cover" />
        </div>
        {/* Pending Requests List */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-yellow-700">Pending Requests</h2>
          {pendingRequests.length > 0 ? (
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {pendingRequests.map((asset) => (
                <li key={asset._id}>
                  {asset.assetName} - Requested on{" "}
                  {new Date(asset.requestDate).toLocaleDateString()}
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
