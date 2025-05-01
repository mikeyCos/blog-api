import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../hooks/useAuth";
import axios from "../config/axios.config";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Need to verify token on the server?
  // If token does not exists
  //  Redirect to login page
  const { accessToken } = useAuth();

  // useEffect(() => {
  //   const authenticateToken = async() => {
  //     await axios.get('/auth').then(res => {
  //       console.log(res)
  //     })
  //   }

  // },[])

  // if (isLoggedOut) return <Navigate to="/" />;
  if (!accessToken) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
