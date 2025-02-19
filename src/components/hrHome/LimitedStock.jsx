import React, { useEffect, useState } from "react";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";
import axios from "axios";

const LimitedStock = () => {
  const [limitedStock, setLimitedStock] = useState([]);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/assets")
      .then((response) => {
        const lowStockItems = response.data.filter((item) => item.quantity <= 10);
        setLimitedStock(lowStockItems);
      })
      .catch((error) => {
        console.error("Error fetching limited stock assets:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 mt-8">
      {/* Title */}
      <SharedTitle
        heading="Limited Stock"
        subHeading="Keep track of assets running low to ensure timely restocking and uninterrupted resource availability."
      />
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-6">
        {limitedStock.length > 0 ? (
          limitedStock.map((item) => (
            <div key={item._id} className="shadow-lg rounded-lg bg-gray-100 p-4 border">
              <h2 className="text-lg font-bold mb-2">{item.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {item.type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Added Date:</strong> {new Date(item.addedDate).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">
                <strong>Quantity:</strong>{" "}
                <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  {item.quantity}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No limited stock items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LimitedStock;
