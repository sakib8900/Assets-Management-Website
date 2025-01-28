import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../providers/AuthProvider';
import logo from '../../assets/logo.webp';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    // Check employee collection first
                    const employeeResponse = await fetch(`http://localhost:5000/employee`);
                    const employeeData = await employeeResponse.json();
                    const employeeUser = employeeData.find(emp => emp.email.toLowerCase() === user.email.toLowerCase());

                    if (employeeUser) {
                        setUserRole('employee');
                        setUserData(employeeUser);
                        return;
                    }

                    // If not employee, check HR collection
                    const hrResponse = await fetch(`http://localhost:5000/hrManager`);
                    const hrData = await hrResponse.json();
                    const hrUser = hrData.find(hr => hr.email.toLowerCase() === user.email.toLowerCase());

                    if (hrUser) {
                        setUserRole('hr');
                        setUserData(hrUser);
                        return;
                    }

                    setUserRole(null);
                    setUserData(null);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setUserRole(null);
                    setUserData(null);
                }
            } else {
                setUserRole(null);
                setUserData(null);
            }
        };

        fetchUserRole();
    }, [user]);

    const handleLogOut = () => {
        logOut().then(() => {
            setUserRole(null);
            setUserData(null);
        });
    };

    const getNavLinks = () => {
        const commonLinks = [
            <NavLink key="home" to="/">Home</NavLink>
        ];

        // If not logged in, show join options
        if (!user) {
            return [
                ...commonLinks,
                <NavLink key="employee-form" to="/employeeForm">Join as Employee</NavLink>,
                <NavLink key="hr-form" to="/hrForm">Join as HR Manager</NavLink>
            ];
        }

        // If role is loaded, show role-specific links
        if (userRole === 'employee') {
            console.log('Showing employee links'); // Debug log
            return [
                ...commonLinks,
                <NavLink key="my-assets" to="/myAssets">My Assets</NavLink>,
                <NavLink key="request-assets" to="/requestAssets">Request for Assets</NavLink>
            ];
        }

        if (userRole === 'hr') {
            return [
                ...commonLinks,
                <NavLink key="assets" to="/assets">Asset List</NavLink>,
                <NavLink key="add-assets" to="/addAssets">Add Asset</NavLink>,
                <NavLink key="action-assets" to="/actionAssets">Assets Request</NavLink>,
                <NavLink key="my-employees" to="/myEmployees">My Employees</NavLink>,
                <NavLink key="add-employee" to="/addEmployee">Add Employee</NavLink>
            ];
        }

        return commonLinks;
    };

    console.log('Current user role:', userRole); // Debug log
    console.log('Current user data:', userData); // Debug log

    return (
        <div className="navbar bg-blue-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {getNavLinks()}
                    </ul>
                </div>
                <img
                    src={userData?.company?.logo || logo}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full"
                />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {getNavLinks()}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-2">
                        <img
                            src={userData?.photoURL || user.photoURL}
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                        <NavLink to="/profile" className="mr-4">Profile</NavLink>
                        <button onClick={handleLogOut} className="btn btn-ghost">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-error">
                        <NavLink to="/login">Login</NavLink>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;