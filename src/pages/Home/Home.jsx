import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Packages from "../../components/Packages/Packages";
import { Helmet } from "react-helmet";
import NormalUser from "../../components/normalUser/normalUser";
import UserText from "../../components/normalUser/UserText";
import PendingReq from "../../components/hrHome/PendingReq";
import PendingReqBanner from "../../components/employeeHome/PendingReqBanner";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const fetchUserRole = async (email) => {
  const [employeeResponse, hrResponse] = await Promise.all([
    fetch("https://asset-management-system-server-one.vercel.app/employee"),
    fetch("https://asset-management-system-server-one.vercel.app/hrManager"),
  ]);

  const [employeeData, hrData] = await Promise.all([
    employeeResponse.json(),
    hrResponse.json(),
  ]);

  const employeeUser = employeeData.find(
    (emp) => emp.email.toLowerCase() === email.toLowerCase()
  );

  if (employeeUser) {
    return { role: "employee", data: employeeUser };
  }

  const hrUser = hrData.find(
    (hr) => hr.email.toLowerCase() === email.toLowerCase()
  );

  if (hrUser) {
    return { role: "hr", data: hrUser };
  }

  return { role: null, data: null };
};

const Home = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: () => fetchUserRole(user.email),
    enabled: !!user?.email, // Query only runs if user is logged in
  });

  if (isLoading) {
    return <Loading />;
  }

  const { role, data: userData } = data || {};

  return (
    <div>
      <Helmet>
        <title>Asset Management || Home</title>
      </Helmet>

      {/* no user */}
      {!user && (
        <>
          <Banner />
          <About />
          <Packages />
        </>
      )}

      {/* if user have no role */}
      {user && !role && (
        <>
          <NormalUser />
          <UserText />
        </>
      )}

      {/* if role is hr */}
      {role === "hr" && <PendingReq />}

      {/* if role is employee */}
      {role === "employee" && (
        <>
          <NormalUser />
          <PendingReqBanner />
        </>
      )}
    </div>
  );
};

export default Home;
