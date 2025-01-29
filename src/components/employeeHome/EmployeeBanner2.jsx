import React from "react";
import { FaCalendarAlt, FaBullhorn, FaClipboardList } from "react-icons/fa";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

const EmployeeBanner2 = () => {
  return (
    <div className="bg-blue-100 p-6 md:p-12 mt-8 rounded-lg shadow-lg">
      {/* Heading */}
      <SharedTitle heading="employee dashboard"></SharedTitle>
      {/* Calendar, Events, Notice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaCalendarAlt className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800">Calendar</h3>
          <p className="text-gray-600 mt-2">
            Stay updated with upcoming events, meetings, and deadlines.
          </p>
        </div>
        {/* Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaBullhorn className="text-green-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800">Events</h3>
          <p className="text-gray-600 mt-2">
            Check out the latest office events and team-building activities.
          </p>
        </div>
        {/* Notice Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaClipboardList className="text-red-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800">Notices</h3>
          <p className="text-gray-600 mt-2">
            Get important announcements and updates from HR & management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBanner2;
