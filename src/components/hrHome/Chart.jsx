import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const [returnableCount, setReturnableCount] = useState(0);
  const [nonReturnableCount, setNonReturnableCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/assets")
      .then((response) => {
        const returnable = response.data.filter(
          (item) => item.type === "Returnable"
        ).length;
        const nonReturnable = response.data.filter(
          (item) => item.type === "Non-returnable"
        ).length;

        setReturnableCount(returnable);
        setNonReturnableCount(nonReturnable);
      })
      .catch((error) => console.error("Error fetching asset data:", error));
  }, []);

  const data = {
    labels: ["Returnable", "Non-Returnable"],
    datasets: [
      {
        data: [returnableCount, nonReturnableCount],
        backgroundColor: ["#FF098CFF", "#36CBF4FF"],
        hoverBackgroundColor: ["#A0006EFF", "#0082C7FF"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 mt-8">
      <SharedTitle
        heading="Asset Type Distribution"
        subHeading="Overview of returnable and non-returnable assets in the system."
      />

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Section - Additional Info */}
        <div className="w-full lg:w-1/3 text-center lg:text-left bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Asset Summary
          </h3>
          <p>
            <span className="font-semibold text-green-600">Returnable:</span>{" "}
            {returnableCount}
          </p>
          <p>
            <span className="font-semibold text-red-600">Non-Returnable:</span>{" "}
            {nonReturnableCount}
          </p>
          <p className="mt-2 text-gray-600">
            Returnable assets are reusable, while non-returnable assets are
            consumable or permanent.
          </p>
        </div>

        {/* Middle Section - Pie Chart */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-64 md:w-80">
            <Pie data={data} />
          </div>
        </div>

        {/* Right Section - Additional Insights */}
        <div className="w-full lg:w-1/3 bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Insights & Trends
          </h3>
          <p className="text-gray-600">
            Track the distribution of assets in your system. A higher percentage
            of returnable assets indicates cost efficiency, while non-returnable
            assets might require budget adjustments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
