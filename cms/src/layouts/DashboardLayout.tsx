import { Outlet } from "react-router";

import DashboardNavBar from "../components/dashboardNavBar/DashboardNavBar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavBar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
