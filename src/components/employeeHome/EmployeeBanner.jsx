import React from "react";
import employeeImg from "../../assets/employee/employeeRequest.jpeg";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";
import { Link } from "react-router-dom";

const EmployeeBanner = () => {
    return (
        <div className="mt-8 p-4 md:p-12 rounded-lg shadow-lg flex flex-col items-center">
            {/* Heading */}
            <SharedTitle heading="need any assets ?"></SharedTitle>

            {/* Bottom Section - Image & Text */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                {/* Left */}
                <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <img
                        src={employeeImg}
                        alt="Employee Request"
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
                {/* Right */}
                <div className="md:w-2/3 ml-5 text-center md:text-left">
                    <p className="text-lg text-gray-700">
                        If you need any asset for your work, you can request it now!
                        Our asset management system ensures that you get the necessary tools for your job.
                    </p>
                    <Link to="requestAssets">
                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Request Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeBanner;
