import { useEffect } from "react";
import { axiosPrivate } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const { accessToken, setAccessToken } = useAuth();
  const refresh = useRefreshToken(setAccessToken);

  useEffect(() => {
    console.log("useAxiosPrivate mounted...");
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (accessToken) {
          console.log("requestInterceptor useAxiosPrivate");
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    // What if access token expires when a user submits a form?
    // Retry original request one time
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.log("responseInterceptor err:", err);
        if (err.request.status === 403 || err.request.status === 401) {
          await refresh();
          return;
        }
        return Promise.reject(err);
      }
    );

    return () => {
      console.log("useAxiosPrivate clean up function running...");
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
