import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import monthly from "../../assets/employee/date.jpeg";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

const MonthReq = () => {
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get("https://asset-management-system-server-one.vercel.app/myAssets")
        .then((response) => {
          const currentMonth = new Date().getMonth();
          const userMonthlyRequests = response.data.filter((asset) => {
            const requestDate = new Date(asset.requestDate);
            return (
              asset.requesterEmail === user.email &&
              requestDate.getMonth() === currentMonth
            );
          });

          // Sort by requestDate (newest first)
          userMonthlyRequests.sort(
            (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
          );

          setMonthlyRequests(userMonthlyRequests);
        })
        .catch((error) => {
          console.error("Error fetching monthly requests:", error);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="bg-blue-100 p-6 rounded-md shadow-md mt-5">
      <SharedTitle heading="Requests This Month" />
      {/* 2 section */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Left Section - Requests List */}
        <div className="w-full md:w-2/3">
          {monthlyRequests.length > 0 ? (
            <ul className="list-disc pl-5">
              {monthlyRequests.map((asset) => (
                <li key={asset._id} className="text-gray-700 mb-2">
                  <span className="font-semibold">{asset.assetName}</span> - Requested on{" "}
                  <span className="text-gray-500">
                    {new Date(asset.requestDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No requests this month.</p>
          )}
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0">
          <img
            src={monthly}
            alt="Monthly Requests"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MonthReq;
