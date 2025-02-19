import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";

import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Packages from "../../components/Packages/Packages";
import NormalUser from "../../components/normalUser/normalUser";
import UserText from "../../components/normalUser/UserText";
import PendingReq from "../../components/hrHome/PendingReq";
import PendingReqBanner from "../../components/employeeHome/PendingReqBanner";
import TopReq from "../../components/hrHome/TopReq";
import LimitedStock from "../../components/hrHome/LimitedStock";
import Chart from "../../components/hrHome/Chart";
import OurCom from "../../components/hrHome/OurCom";
import OurEmployee from "../../components/hrHome/OurEmployee";
import MonthReq from "../../components/employeeHome/MonthReq";
import EmployeeBanner from "../../components/employeeHome/EmployeeBanner";
import EmployeeBanner2 from "../../components/employeeHome/EmployeeBanner2";
import Contact from "../../components/About/Contact";
import Loading from "../../Shared/Loading/Loading";

// Function to fetch user role based on email
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

    // Fetching user role and data using React Query
    const { data, isLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: () => fetchUserRole(user.email),
        enabled: !!user?.email,
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

            {/* Banner and other components for no user */}
            {!user && (
                <>
                    <Banner />
                    <About />
                    <Packages />
                    <Contact />
                </>
            )}

            {/* If user is logged in but has no role */}
            {user && !role && (
                <>
                    <NormalUser />
                    <UserText />
                </>
            )}

            {/* HR Role Section */}
            {role === "hr" && (
                <>
                    <NormalUser />
                    <div className="md:mx-8">
                        <PendingReq />
                        <TopReq />
                        <LimitedStock />
                        <Chart />
                        <OurCom />
                        <OurEmployee />
                    </div>
                </>
            )}

            {/* Employee Role Section */}
            {role === "employee" && (
                <>
                    <NormalUser />
                    <div className="md:mx-8">
                        <PendingReqBanner />
                        <MonthReq />
                        <EmployeeBanner />
                        <EmployeeBanner2 />
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
