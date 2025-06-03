import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
// import axiosDefault from "../config/axios.config";
// import { usePrevLocation } from "../hooks/usePrevLocation";
// import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProtectedLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("ProtectedLayout running");
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  // const refresh = useRefreshToken();
  // console.log(prevLocation);
  // if (!accessToken)
  //   return <Navigate to="/login" state={{ from: location }} replace />;

  const navigate = useNavigate();
  console.log("accessToken:", accessToken);

  useEffect(() => {
    console.log("ProtectedLayout mounted...");
    /* if (!accessToken)
        navigate("/login", { state: { from: location }, replace: true }); */

    /*     const responseInterceptor = axiosDefault.interceptors.response.use(
      async (response) => response,
      async (err) => {
        console.log("err:", err);
        if (err.request.status === 403) {
          return await refresh();
        }
        return Promise.reject(err);
      }
    );

    const requestInterceptor = axiosDefault.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    ); */

    const authorize = async () => {
      try {
        /* const response = await axiosDefault.get("/auth", {
          withCredentials: true,
        }); */
        await axiosPrivate.get("/auth");

        // setAccessToken(response.data.data.accessToken);
      } catch (err) {
        console.log("authorize err caught");
        console.log(location);
        console.log(err);
        // setAccessToken(null);
        navigate("/login", { state: { prevLocation: location.pathname } });
      }
    };

    authorize();

    return () => {
      console.log("ProtectedLayout clean up function running...");
      /*       axiosDefault.interceptors.response.eject(responseInterceptor);
      axiosDefault.interceptors.request.eject(requestInterceptor); */
    };
  }, [location]);

  return (
    <>
      <main>{children ?? <Outlet />}</main>
    </>
  );
};

export default ProtectedLayout;
