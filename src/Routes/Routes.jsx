import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AssetsList from "../pages/Hr/AssetsList/AssetsList";
import HrForm from "../pages/Hr/HrForm/HrForm";
import EmployeeForm from "../pages/Employee/EmployeeForm/EmployeeForm";
import Login from "../pages/Login/Login";
import AddAssets from "../pages/Hr/AddAssets/AddAssets";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Payment from "../pages/Payment/Payment";
import AddEmployee from "../pages/Hr/AddEmployee/AddEmployee";
import RequestAssets from "../pages/Employee/RequestAssets/RequestAssets";
import ActionAssets from "../pages/Hr/ActionAssets/ActionAssets";
import MyAssets from "../pages/Employee/MyAssets/MyAssets";
import MyEmployee from "../pages/Hr/MyEmployee/MyEmployee";
import MyTeam from "../pages/Employee/MyTeam/MyTeam";


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
        path: "profile",
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      },
      {
        path: "payment",
        element: <PrivateRoute>
          <Payment></Payment>
        </PrivateRoute>
      },
      // hr
      {
        path: "hrForm",
        element:
          <HrForm></HrForm>
      },
      {
        path: "assets",
        element: <PrivateRoute>
          <AssetsList></AssetsList>
        </PrivateRoute>
      },
      {
        path: "addAssets",
        element: <PrivateRoute>
          <AddAssets></AddAssets>
        </PrivateRoute>

      },
      {
        path: "actionAssets",
        element: <PrivateRoute>
          <ActionAssets></ActionAssets>
        </PrivateRoute>
      },
      {
        path: "myEmployees",
        element: 
        <PrivateRoute>
            <MyEmployee></MyEmployee>
          </PrivateRoute>
      },
      {
        path: "addEmployee",
        element: <PrivateRoute>
          <AddEmployee></AddEmployee>
        </PrivateRoute>
      },
      // employee
      {
        path: "employeeForm",
        element: <EmployeeForm></EmployeeForm>
      },
      {
        path: "myAssets",
        element: <PrivateRoute>
          <MyAssets></MyAssets>
        </PrivateRoute>
      },
      // todo my team
      {
        path: "myTeam",
        element: <MyTeam></MyTeam>
      },
      {
        path: "requestAssets",
        element: <PrivateRoute>
          <RequestAssets></RequestAssets>
        </PrivateRoute>
      },

    ]
  },
]);