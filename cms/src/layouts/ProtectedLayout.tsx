import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import axios from "../config/axios.config";
// import { usePrevLocation } from "../hooks/usePrevLocation";

const ProtectedLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("ProtectedLayout running");
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
  // console.log(prevLocation);
  // if (!accessToken)
  //   return <Navigate to="/login" state={{ from: location }} replace />;

  const navigate = useNavigate();
  console.log("accessToken:", accessToken);

  useEffect(() => {
    console.log("ProtectedLayout mounted...");
    /* if (!accessToken)
        navigate("/login", { state: { from: location }, replace: true }); */
    const responseInterceptor = axios.interceptors.response.use(
      async (response) => {
        console.log("response in responseInterceptor:", response);
        /* if (response.data.status === "fail") {
          return await axios.post("/auth/refresh");
        } */

        return response;
      },
      async (err) => {
        console.log("err:", err);
        // return Promise.reject(err);
        if (err.request.status === 403) {
          return await axios.post("/auth/refresh");
        }
        return Promise.reject(err);
      }
    );

    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const authorize = async () => {
      try {
        console.log("accessToken in authorize():", accessToken);

        if (accessToken) {
          console.log("accessToken exists");
          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${accessToken}`;
          setTimeout(async () => {
            console.log('right before await axios.get("/auth") request');
            console.log("accessToken:", accessToken);
            // const response = await axios.get("/auth");
            // console.log("response:", response);
            // setAccessToken(response.data.data.accessToken);
          }, 0);

          // const response = await axios.get("/auth");
          // // Need to intercept response, and send a new request to "/auth/refresh" (post request)
          // // Only try one attempt each for both paths
          // // If the response from "/auth/refresh" is bad
          // //  Then set access token to null and redirect user to login page

          // console.log("response:", response);
          // setAccessToken(response.data.data.accessToken);
        }

        // // https://dikshantraj2001.medium.com/retry-failed-request-using-axios-interceptors-5472549dc57a
        const response = await axios.get("/auth");
        // // Need to intercept response, and send a new request to "/auth/refresh" (post request)
        // // Only try one attempt each for both paths
        // // If the response from "/auth/refresh" is bad
        // //  Then set access token to null and redirect user to login page

        console.log("authorize response:", response);
        setAccessToken(response.data.data.accessToken);
      } catch (err) {
        console.log("authorize err caught");
        console.log(location);
        console.log(err);
        setAccessToken(null);
        navigate("/login", { state: { prevLocation: location.pathname } });
      }
    };

    authorize();

    return () => {
      console.log("ProtectedLayout clean up function running...");
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [location]);

  return (
    <>
      <main>{children ?? <Outlet />}</main>
    </>
  );
};

export default ProtectedLayout;
