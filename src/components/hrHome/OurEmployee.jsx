import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SharedTitle from '../../Shared/SharedTitle/SharedTitle';
import { AuthContext } from '../../providers/AuthProvider';

const OurEmployee = () => {
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
            <SharedTitle heading="Employee details"></SharedTitle>
            <div className="flex flex-wrap justify-center gap-6">
                {hrManagers.map((hrManager) =>
                    hrManager.email === user.email ? (
                        <div
                            key={hrManager._id}
                            className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Profile Information */}
                                <div className="flex-1 space-y-4">
                                    <div className="text-center md:text-left">
                                        <h2 className="text-2xl font-bold text-blue-500">
                                           Name: <span className='text-gray-800'>{hrManager.fullName}</span>
                                        </h2>
                                        <p className="text-blue-500">
                                            Email: <span className="text-gray-600">{hrManager.email}</span></p>
                                    </div>
                                    
                                    {/* Members Section */}
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            Team Members
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            {hrManager.team && hrManager.team.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {hrManager.team.map((memberEmail, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center space-x-2 text-gray-700"
                                                        >
                                                            <span className="w-6 text-center">
                                                                {index + 1}.
                                                            </span>
                                                            <span>{memberEmail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-600 text-center">
                                                    No team members found
                                                </p>
                                            )}
                                        </div>
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

export default OurEmployee;