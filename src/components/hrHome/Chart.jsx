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

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Pie Chart on Left */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-64 md:w-80">
            <Pie data={data} />
          </div>
        </div>
        {/* Description on Right */}
        <div className="w-full md:w-3/4 p-3 rounded-lg text-center md:text-left">
          <p className="mt-4">
            <span className="font-semibold text-green-600">Returnable:</span>{" "}
            {returnableCount}
          </p>
          <p>
            <span className="font-semibold text-red-600">Non-Returnable:</span>{" "}
            {nonReturnableCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
