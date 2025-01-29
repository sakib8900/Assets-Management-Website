import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import SharedTitle from "../../../Shared/SharedTitle/SharedTitle";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";

const MyEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-one.vercel.app/employee")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://asset-management-system-server-one.vercel.app/employee/${id}`)
          .then(() => {
            setEmployees(employees.filter((employee) => employee._id !== id));
            Swal.fire("Deleted!", "The employee has been removed.", "success");
          })
          .catch((error) => {
            console.error("Error removing employee:", error);
            Swal.fire("Error!", "Failed to remove the employee.", "error");
          });
      }
    });
  };
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Asset Management || My Employee</title>
      </Helmet>
      <SharedTitle heading="my employees"></SharedTitle>
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
            {employees.map((employee, idx) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td>{idx + 1}</td>
                <td className="p-3">{employee.displayName}</td>
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
