import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
// import { usePrevLocation } from "../hooks/usePrevLocation";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProtectedLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("ProtectedLayout running");
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  // console.log(prevLocation);
  // if (!accessToken)
  //   return <Navigate to="/login" state={{ from: location }} replace />;

  const navigate = useNavigate();
  console.log("accessToken:", accessToken);

  useEffect(() => {
    console.log("ProtectedLayout mounted...");

    const authorize = async () => {
      try {
        await axiosPrivate.get("/auth");
      } catch (err) {
        console.log("authorize err caught");
        console.log(location);
        console.log(err);
        // What if an authenticated user is deleted and a /auth request is sent?
        // Should the user be notified?
        setAccessToken(null);
        navigate("/login", { state: { prevLocation: location.pathname } });
      }
    };

    authorize();
  }, [location]);

  return (
    <>
      <main>{children ?? <Outlet />}</main>
    </>
  );
};

export default ProtectedLayout;
