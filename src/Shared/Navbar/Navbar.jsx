import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import logo from '../../assets/logo.webp';

// Fetch user role based on email
const fetchUserRole = async (email) => {
  const [employeeResponse, hrResponse] = await Promise.all([
    fetch("https://asset-management-system-server-one.vercel.app/employee"),
    fetch("https://asset-management-system-server-one.vercel.app/hrManager")
  ]);

  const [employeeData, hrData] = await Promise.all([
    employeeResponse.json(),
    hrResponse.json()
  ]);

  const employeeUser = employeeData.find(
    (emp) => emp.email.toLowerCase() === email.toLowerCase()
  );

  if (employeeUser) {
    return { role: "employee", data: employeeUser };
  }

  const hrUser = hrData.find(
    (hr) => hr.email.toLowerCase() === email.toLowerCase()
  );

  if (hrUser) {
    return { role: "hr", data: hrUser };
  }

  return { role: null, data: null };
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  // Use Tanstack Query to fetch user role and data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: () => fetchUserRole(user?.email),
    enabled: !!user?.email,
  });

  const handleLogOut = () => {
    logOut().then(() => {
      navigate('/')
    });
  };

  const getNavLinks = () => {
    const commonLinks = [
      <NavLink key="home" to="/">Home</NavLink>
    ];

    if (!user) {
      return [
        ...commonLinks,
        <NavLink key="employee-form" to="/employeeForm">Join as Employee</NavLink>,
        <NavLink key="hr-form" to="/hrForm">Join as HR Manager</NavLink>
      ];
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error loading role</div>;
    }

    const { role, data: userData } = data || {};

    if (role === 'employee') {
      return [
        ...commonLinks,
        <NavLink key="my-assets" to="/myAssets">My Assets</NavLink>,
        <NavLink key="request-assets" to="/requestAssets">Request for Assets</NavLink>,
        <NavLink key="my-team" to="/myTeam">My Team</NavLink>
      ];
    }

    if (role === 'hr') {
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

  const { role, data: userData } = data || {};

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
