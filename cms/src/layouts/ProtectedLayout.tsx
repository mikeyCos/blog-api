import { Outlet } from "@tanstack/react-router";

const ProtectedLayout = () => {
  console.log("[ProtectedLayout] rendering");
  return <Outlet />;
};

export default ProtectedLayout;
