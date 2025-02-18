import React, { useEffect, useState } from "react";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";
import topReq from "../../assets/hr/shopping.jpeg";
import axios from "axios";

const TopReq = () => {
  const [topRequests, setTopRequests] = useState([]);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/assets")
      .then((response) => {
        const sortedAssets = response.data
          .sort((a, b) => b.requestCount - a.requestCount)
          .slice(0, 4);
        setTopRequests(sortedAssets);
      })
      .catch((error) => {
        console.error("Error fetching top requests:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 mt-8">
      {/* Title */}
      <SharedTitle
        heading="Top Requested Items"
        subHeading="Discover the most in-demand assets to better understand employee needs and streamline resource allocation."
      />
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mt-8">
        
        {/* Image left */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={topReq}
            alt="Top Requested Items"
            className="w-full md:mt-20 lg:mt-0 max-w-[400px] object-contain"
          />
        </div>

        {/* Table for right */}
        <div className="w-full md:w-1/2 overflow-x-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r bg-gray-400 text-white">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Asset Name</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Request Count</th>
                </tr>
              </thead>
              <tbody>
                {topRequests.length > 0 ? (
                  topRequests.map((asset, idx) => (
                    <tr key={asset._id}>
                      <td className="p-3 border-b">{idx + 1}</td>
                      <td className="p-3 border-b">{asset.name}</td>
                      <td className="p-3 border-b">{asset.type}</td>
                      <td className="p-3 border-b font-bold">
                        {asset.requestCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopReq;
