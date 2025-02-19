import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/hr/assetslogo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold">Assets Management Track</h2>
          </div>
          <p className="text-sm">123 ABS Street, Uni 21, Bangladesh</p>
          <p className="text-sm">+88 *********</p>
          <div className="text-sm">
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
        {/* Services Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">SERVICES</h3>
          <ul className="space-y-2">
            <li>
              <Link to="hrGuest">
                <a className="link link-hover text-gray-100">Hr Demo</a>
              </Link>
            </li>
            <li>
            <Link to="employeeGuest">
              <a className="link link-hover text-gray-100">Employee Demo</a>
            </Link>
            </li>
            <li>
            <Link to="privacy">
              <a className="link link-hover text-gray-100">Privacy Policy</a>
            </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">FOLLOW US</h3>
          <p className="mb-4">Join us on social media</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/nip.sakib.1"
              className="link link-hover text-gray-100"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/nazmul-islam-saki0b/"
              className="link link-hover text-gray-100"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 pt-4 border-t border-blue-500">
        <p>Copyright © TrackSmart. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
