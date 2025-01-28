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
import AddAssets from "../pages/Hr/AddAssets/AddAssets";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Payment from "../pages/Payment/Payment";
import AddEmployee from "../pages/Hr/AddEmployee/AddEmployee";
import RequestAssets from "../pages/Employee/RequestAssets/RequestAssets";
import ActionAssets from "../pages/Hr/ActionAssets/ActionAssets";
import MyAssets from "../pages/Employee/MyAssets/MyAssets";

  
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
        {
          path: "profile",
          element: <Profile></Profile>
        },
        {
          path: "payment",
          element: <Payment></Payment>
        },
        // hr
        {
          path: "hrForm",
          element:
            <HrForm></HrForm>
        },
        {
          path: "addEmployee",
          element:<AddEmployee></AddEmployee>
        },
        {
          path: "assets",
          element: <AssetsList></AssetsList>
        },
        {
          path: "addAssets",
          element: <AddAssets></AddAssets>
        },
        {
          path: "actionAssets",
          element: <ActionAssets></ActionAssets>
        },
        // employee
        {
          path: "employeeForm",
          element: <EmployeeForm></EmployeeForm>
        },
        {
          path: "requestAssets",
          element: <RequestAssets></RequestAssets>
        },
        {
          path: "myAssets",
          element: <MyAssets></MyAssets>
        },
      ]
    },
  ]);