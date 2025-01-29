import React, { useEffect, useState } from "react";
import axios from "axios";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";
import Loading from "../../Shared/Loading/Loading";

const PendingReq = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/myAssets")
      .then((response) => {
        const pendingData = response.data.filter(
          (request) => request.status === "pending"
        );
        setPendingRequests(pendingData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto p-6">
      <SharedTitle
        heading="Pending Request"
        subHeading="Review and manage employee requests awaiting your approval to ensure seamless operations."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {pendingRequests.slice(0, 6).length > 0 ? (
          pendingRequests.slice(0, 6).map((request) => (
            <div
              key={request._id}
              className="card bg-base-100 shadow-md p-4 border rounded-lg"
            >
              <h2 className="text-lg font-bold mb-2">{request.assetName}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Asset Type:</strong> {request.assetType}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Requester By:</strong> {request.requesterName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Request Status:</strong>{" "}
                <span className="bg-red-500 px-2 py-1 rounded-xl text-white font-bold ml-2">
                  {request.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No pending requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingReq;
