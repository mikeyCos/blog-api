import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = (
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // const [axiosPrivateLoading, setAxiosPrivateLoading] = useState(true);
  const refresh = useRefreshToken();
  useEffect(() => {
    console.group("useAxiosPrivate mounted...");
    console.groupEnd();
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.group("useAxiosPrivate requestInterceptor");
        console.log("config.url:", config.url);
        console.log("requestInterceptor accessToken:", accessToken);
        console.groupEnd();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          console.log("accessToken not set");
        }

        console.log("config.headers:", config.headers);
        return config;
      }
    );

    // What if access token expires when a user submits a form?
    // Retry original request one time
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.group(
          "useAxiosPrivate responseInterceptor err handler running..."
        );
        console.groupEnd();
        if (err.request.status === 403 || err.request.status === 401) {
          console.log("responseInterceptor accessToken:", accessToken);
          const refreshResponse = await refresh();
          console.log("refreshResponse:", refreshResponse);
          console.log("err.config:", err.config);
          err.config.headers["Authorization"] =
            `Bearer ${refreshResponse.accessToken}`;
          setAccessToken(refreshResponse.accessToken);
          return axiosPrivate(err.config);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      console.log("useAxiosPrivate clean up function running...");
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh, setAccessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
