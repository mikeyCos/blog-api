import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosPrivate as globalAxiosPrivate } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
import { AxiosInstance } from "axios";
import { useAuth } from "./useAuth";

// https://stackoverflow.com/questions/75676588/react-integration-of-axios-instance-allowing-token-refresh

const useAxiosPrivate = () => {
  const [interceptorsReady, setInterceptorsReady] = useState(false);
  const { accessToken, setAccessToken } = useAuth();
  const refresh = useRefreshToken();
  useEffect(() => {
    console.group("useAxiosPrivate mounted...");
    console.groupEnd();
    const requestInterceptor = globalAxiosPrivate.interceptors.request.use(
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
    const responseInterceptor = globalAxiosPrivate.interceptors.response.use(
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
          return globalAxiosPrivate(err.config);
        }
        return Promise.reject(err);
      }
    );

    setInterceptorsReady(true);

    return () => {
      console.log("useAxiosPrivate clean up function running...");
      globalAxiosPrivate.interceptors.request.eject(requestInterceptor);
      globalAxiosPrivate.interceptors.response.eject(responseInterceptor);
      setInterceptorsReady(false);
    };
  }, [accessToken, refresh, setAccessToken]);

  return { axiosPrivate: globalAxiosPrivate, interceptorsReady };
};

export default useAxiosPrivate;
