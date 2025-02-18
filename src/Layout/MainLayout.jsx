import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
const MainLayout = () => {
  const location = useLocation();
  const noNavFoot = location.pathname.includes("login");
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {noNavFoot || <Navbar></Navbar>}
      {/* Main Context */}
      <div
        className={`flex-grow ${
          location.pathname === "/" ? "w-full" : "w-[90%] md:w-[95%] mx-auto"
        }`}
      >
        <Outlet />
      </div>
      {/* Footer */}
      {noNavFoot || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
