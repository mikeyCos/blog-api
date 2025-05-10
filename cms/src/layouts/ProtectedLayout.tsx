import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import axios from "../config/axios.config";

const ProtectedLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("ProtectedLayout running");
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
  console.log(location);
  if (!accessToken)
    return <Navigate to="/login" state={{ from: location }} replace />;

  const navigate = useNavigate();
  console.log("accessToken:", accessToken);

  useEffect(() => {
    console.log("ProtectedLayout mounted...");
    //   /* if (!accessToken)
    //     navigate("/login", { state: { from: location }, replace: true }); */
    const authorize = async () => {
      try {
        console.log("accessToken in authorize():", accessToken);

        if (accessToken)
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        const response = await axios.post("/auth/refresh");

        console.log("response:", response);
        setAccessToken(response.data.data.accessToken);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    authorize();
  }, []);

  return (
    <>
      <main>{children ?? <Outlet />}</main>
    </>
  );
};

export default ProtectedLayout;
