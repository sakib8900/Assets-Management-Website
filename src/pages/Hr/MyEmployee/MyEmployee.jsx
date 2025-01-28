import React, { useEffect, useState } from "react";
import axios from "axios";

const MyEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5000/employee/${id}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee._id !== id));
      })
      .catch((error) => {
        console.error("There was an error removing the employee!", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Employees</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100">
                <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {employees.map((employee,idx) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td>{idx+1}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3">{employee.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleRemove(employee._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployee;
