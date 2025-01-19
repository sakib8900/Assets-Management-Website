import React from 'react';
import { Outlet } from "react-router-dom"
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar></Navbar>
            {/* Main Context */}
            <div className="py-10 flex-grow">
                <Outlet></Outlet>
            </div>
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;