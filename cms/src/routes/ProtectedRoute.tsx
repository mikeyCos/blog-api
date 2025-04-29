import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Need to verify token on the server?
  // If token does not exists
  //  Redirect to login page
  const { token } = useAuth();

  // if (isLoggedOut) return <Navigate to="/" />;
  // if (!isAuthorized) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
