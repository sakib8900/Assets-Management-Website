import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { AuthContext } from '../../providers/AuthProvider';
import logo from '../../assets/logo.webp'

const Navbar = () => {
    const { user, logOut} = useContext(AuthContext)
    const handleLogOut = () =>{
        logOut()
        .then(() => {})
    }
    const links =
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/employeeForm">Join as Employee</NavLink>
            <NavLink to="/hrForm">Join as HR Manager</NavLink>
            {
                    user ? <>
                    <NavLink to="/profile">Profile</NavLink>
                    </> : <>
                       
                    </>
                }
        </>
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
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                {/* TODO dynamic korbo pore */}
                <img
                    src={logo}
                    alt="User Profile"
                    className="w-12 h-12 rounded-full"
                />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                    <button onClick={handleLogOut} className='btn btn-ghost'>Logout</button>
                    </> : <>
                        <button className='btn btn-error'>
                            <NavLink to="/login">Login</NavLink>
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;