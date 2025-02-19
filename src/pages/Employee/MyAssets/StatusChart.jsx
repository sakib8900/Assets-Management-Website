import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import SharedTitle from "../../../Shared/SharedTitle/SharedTitle";
import { AuthContext } from "../../../providers/AuthProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = () => {
  const { user } = useContext(AuthContext);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/myAssets")
      .then((response) => {
        const userAssets = response.data.filter(
          (item) => item.requesterEmail === user?.email
        );
        const approved = userAssets.filter(
          (item) => item.status === "approved"
        ).length;
        const pending = userAssets.filter(
          (item) => item.status === "pending"
        ).length;

        setApprovedCount(approved);
        setPendingCount(pending);
      })
      .catch((error) => console.error("Error fetching asset data:", error));
  }, [user?.email]);

  const data = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [approvedCount, pendingCount],
        backgroundColor: ["#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#388E3C", "#F57C00"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 mt-8">
      <SharedTitle
        heading="Asset Status Distribution"
        subHeading="Overview of approved and pending asset requests."
      />

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Section - Additional Info */}
        <div className="w-full lg:w-1/3 text-center lg:text-left bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Status Summary</h3>
          <p>
            <span className="font-semibold text-green-600">Approved:</span>{" "}
            {approvedCount}
          </p>
          <p>
            <span className="font-semibold text-orange-600">Pending:</span>{" "}
            {pendingCount}
          </p>
          <p className="mt-2 text-gray-600">
            Approved assets have been processed, while pending assets are waiting for approval.
          </p>
        </div>

        {/* Middle Section - Pie Chart */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-64 md:w-80">
            <Pie data={data} />
          </div>
        </div>

        {/* Right Section - Additional Insights */}
        <div className="w-full lg:w-1/3 bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Insights & Trends</h3>
          <p className="text-gray-600">
            Monitor the status of asset requests. A higher percentage of approved assets
            indicates a smooth asset management process, while pending assets may need attention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
