import React from "react";
import { Navigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // If token does not exists
  //  Redirect to login page
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
