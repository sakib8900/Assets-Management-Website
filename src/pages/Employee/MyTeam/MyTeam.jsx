import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import SharedTitle from "../../../Shared/SharedTitle/SharedTitle";
import { FaBuilding, FaEnvelope, FaBirthdayCake, FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Loading from "../../../Shared/Loading/Loading";

const MyTeam = () => {
    const { user } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://asset-management-system-server-one.vercel.app/hrManager")
            .then((response) => {
                console.log("Fetched Data:", response.data);
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Employee data:", error);
            });
    }, []);
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className="w-full px-4 lg:px-8 py-6">
            <Helmet>
                <title>Asset Management || My Team</title>
            </Helmet>
            <SharedTitle heading="My Team" subHeading="Meet Your Team Members" />
            {employees.map((employee) => {
                const isUserInTeam = employee.team.some(email => email.toLowerCase() === user?.email.toLowerCase());
                if (!isUserInTeam) return null;

                return (
                    <div
                        key={employee._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full transform transition-all duration-300 hover:scale-105"
                    >
                        {/* company info */}
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={employee.company.logo}
                                alt={employee.company.name}
                                className="w-24 h-24 object-cover mb-2 rounded-full shadow-md"
                            />
                            <h2 className="text-xl font-bold text-gray-800">{employee.company.name}</h2>
                        </div>

                        {/* hr and employee */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* hr */}
                            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaUsers className="text-blue-500" /> HR Manager
                                </h3>
                                <img
                                    src={employee.profilePicture}
                                    alt={employee.fullName}
                                    className="w-24 h-24 object-cover mb-4 rounded-full shadow-md"
                                />
                                <p className="text-lg font-bold text-gray-900">{employee.fullName}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FaEnvelope className="text-red-500" /> {employee.email}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FaBirthdayCake className="text-yellow-500" /> {employee.dateOfBirth}
                                </p>
                            </div>

                            {/* employee */}
                            <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaUsers className="text-purple-500" /> Team Members
                                </h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                                    {employee.team.map((email, index) => (
                                        <li key={index}>{email}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyTeam;
