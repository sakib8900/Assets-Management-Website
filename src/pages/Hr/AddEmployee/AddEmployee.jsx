import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider'; // Update path as needed

const AddEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hrData, setHrData] = useState(null);
    const { user } = useContext(AuthContext); // Get current user's email

    // Fetch HR data
    useEffect(() => {
        const fetchHrData = async () => {
            try {
                const response = await fetch("http://localhost:5000/hrManager");
                if (!response.ok) {
                    throw new Error("Failed to fetch HR data");
                }
                const data = await response.json();
                // Find the HR data that matches the logged-in user's email
                const currentHrData = data.find(hr => hr.email === user.email);
                setHrData(currentHrData);
            } catch (err) {
                console.error("Error fetching HR data:", err);
                Swal.fire('Error', 'Failed to fetch HR data', 'error');
            }
        };
        fetchHrData();
    }, [user?.email]);

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:5000/employeeJoinReq");
                if (!response.ok) {
                    throw new Error("Failed to fetch employee data");
                }
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleAddEmployee = async (employee) => {
        if (!hrData) {
            Swal.fire('Error', 'HR data not available', 'error');
            return;
        }

        // Check if team limit is reached
        if (hrData.package.currentEmployees >= hrData.package.limit) {
            Swal.fire('Error', 'Team member limit reached for your package', 'error');
            return;
        }

        try {
            // Step 1: Add employee to the employee collection
            const employeeData = {
                displayName: employee.displayName,
                email: employee.email,
                photoURL: employee.photoURL,
                hrEmail: user.email, // Use logged-in HR's email
                company: {
                    name: hrData.company.name,
                    logo: hrData.company.logo
                },
                role: "employee",
            };

            const addEmployeeResponse = await fetch("http://localhost:5000/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            if (!addEmployeeResponse.ok) {
                throw new Error("Failed to add employee");
            }

            // Step 2: Update HR's team array
            const updateHrTeamResponse = await fetch(
                `http://localhost:5000/hrManager/addTeamMember/${user.email}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ employeeEmail: employee.email }),
                }
            );

            if (!updateHrTeamResponse.ok) {
                throw new Error("Failed to update HR team");
            }

            // Step 3: Remove the join request
            const removeResponse = await fetch(
                `http://localhost:5000/employeeJoinReq/${employee._id}`,
                { method: "DELETE" }
            );

            if (!removeResponse.ok) {
                throw new Error("Failed to remove join request");
            }

            // Update local state to reflect changes
            setEmployees(employees.filter(emp => emp._id !== employee._id));
            
            // Update local HR data
            setHrData(prev => ({
                ...prev,
                team: [...(prev.team || []), employee.email],
                package: {
                    ...prev.package,
                    currentEmployees: (prev.package.currentEmployees || 0) + 1
                }
            }));

            Swal.fire('Success', 'Employee added successfully!', 'success');

        } catch (err) {
            console.error("Error in employee addition process:", err);
            Swal.fire('Error', 'Failed to complete employee addition process', 'error');
        }
    };

    const handleReject = async (employeeId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/employeeJoinReq/${employeeId}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to reject request");
            }

            setEmployees(employees.filter(emp => emp._id !== employeeId));
            Swal.fire('Success', 'Request rejected successfully', 'success');
        } catch (err) {
            console.error("Error rejecting request:", err);
            Swal.fire('Error', 'Failed to reject request', 'error');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Employee Join Requests</h1>
            {hrData && (
                <div className="mb-4 text-center">
                    <p>Team Members: {hrData.package.currentEmployees} / {hrData.package.limit}</p>
                </div>
            )}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Full Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.displayName}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center gap-5">
                                    <button
                                        onClick={() => handleAddEmployee(employee)}
                                        className="text-green-600 hover:text-green-800 transition-colors"
                                        disabled={hrData?.package.currentEmployees >= hrData?.package.limit}
                                    >
                                        <FaUser />
                                    </button>
                                    <button 
                                        onClick={() => handleReject(employee._id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <FaX />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddEmployee;