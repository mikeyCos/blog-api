import { createFileRoute, Outlet } from "@tanstack/react-router";
import DashboardNavBar from "../../components/dashboardNavBar/DashboardNavBar";

export const Route = createFileRoute("/_protected/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <DashboardNavBar />
      <Outlet />
    </>
  );
}
