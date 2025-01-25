import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AssetsList from "../pages/Hr/AssetsList/AssetsList";
import HrForm from "../pages/Hr/HrForm/HrForm";
import EmployeeForm from "../pages/Employee/EmployeeForm/EmployeeForm";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "signUp",
          element: <Signup></Signup>
        },
        // hr
        {
          path: "hrForm",
          element: <HrForm></HrForm>
        },
        {
          path: "assets",
          element: <AssetsList></AssetsList>
        },
        // employee
        {
          path: "employeeForm",
          element: <EmployeeForm></EmployeeForm>
        }
      ]
    },
  ]);