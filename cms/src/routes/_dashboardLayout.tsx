import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import DashboardLayout from "../layouts/DashboardLayout";

export const Route = createFileRoute("/_protected")({
  component: DashboardLayout,
});
