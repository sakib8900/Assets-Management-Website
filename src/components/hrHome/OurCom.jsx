import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

const OurCom = () => {
  const { user } = useContext(AuthContext);
  const [hrManagers, setHrManagers] = useState([]);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/hrManager")
      .then((response) => {
        setHrManagers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching HR Manager data:", error);
      });
  }, []);

  return (
    <div className="w-full px-4 lg:px-8 py-6 mt-8">
      <SharedTitle heading="Company Information" subHeading="Meet Our HR Manager"></SharedTitle>
      <div className="flex flex-wrap justify-center gap-6">
        {hrManagers.map((hrManager) =>
          hrManager.email === user.email ? (
            <div
              key={hrManager._id}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 transform transition-all duration-300 hover:scale-105"
            >
              {/* Card Content */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* Left*/}
                <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                  <h3 className="text-lg font-semibold text-gray-800">🏢 Company Info</h3>
                  <img
                    src={hrManager.company.logo}
                    alt={hrManager.company.name}
                    className="w-24 h-24 object-cover mb-4 rounded-full shadow-md"
                  />
                  <h2 className="text-xl font-bold text-gray-800 text-center md:text-left">{hrManager.company.name}</h2>
                  <p className="text-sm text-gray-600 italic text-center md:text-left">
                    Your trusted partner in managing assets
                  </p>
                </div>

                {/* Right */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-semibold text-gray-800">👨‍💼 HR Manager Info</h3>
                  <div className="flex flex-col items-center md:items-start">
                    <img
                      src={hrManager.profilePicture}
                      alt={hrManager.fullName}
                      className="w-24 h-24 object-cover mb-4 rounded-full shadow-md"
                    />
                    <p className="text-lg font-bold text-gray-900">{hrManager.fullName}</p>
                    <p className="text-sm text-gray-600">📧 Email: {hrManager.email}</p>
                    <p className="text-sm text-gray-600">🎂 Date of Birth: {hrManager.dateOfBirth}</p>
                    <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
                      "Managing assets, ensuring smooth operations, and providing support for seamless business growth."
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default OurCom;
