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
                <div className="md:w-2/3 ml-5 p-3 rounded-lg bg-gray-100  text-center md:text-left">
                    <p className="text-lg text-gray-700">
                        If you need any asset for your work, you can request it now!
                        Our asset management system ensures that you get the necessary tools for your job.
                    </p>
                    <Link to="requestAssets">
                        <button className="items-center px-3 mt-2 py-2 backdrop-blur-md text-blue-500 text-lg font-semibold rounded-lg 
                                             shadow-lg hover:bg-blue-500 hover:text-black border-2 border-blue-500 
                                             transition-all duration-300 hover:shadow-blue-500/50 
                                             active:scale-95">
                            Request Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeBanner;
