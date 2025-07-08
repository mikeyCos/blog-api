import React, { createContext, useContext, useEffect, useMemo } from "react";
import { axiosPrivate } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { AxiosInstance } from "axios";

export interface AxiosPrivateContext {
  axiosPrivate: AxiosInstance;
}

const AxiosPrivateContext = createContext<AxiosPrivateContext | null>(null);

const AxiosPrivateProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    console.group("useAxiosPrivate mounted...");
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("requestInterceptor useAxiosPrivate");
        if (accessToken) {
          console.log("requestInterceptor accessToken:", accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.groupEnd();
        return config;
      }
    );

    // What if access token expires when a user submits a form?
    // Retry original request one time
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.group("responseInterceptor err handler running...");
        if (err.request.status === 403 || err.request.status === 401) {
          console.log("responseInterceptor accessToken:", accessToken);
          const refreshResponse = await refresh();
          console.log("refreshResponse:", refreshResponse);
          err.config.headers["Authorization"] =
            `Bearer ${refreshResponse.accessToken}`;
          setAccessToken(refreshResponse.accessToken);
          return axiosPrivate(err.config);
        }
        console.groupEnd();
        return Promise.reject(err);
      }
    );

    return () => {
      console.log("useAxiosPrivate clean up function running...");
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosPrivate]);

  const providerValue = useMemo(() => {
    return { axiosPrivate };
  }, []);

  return (
    <AxiosPrivateContext.Provider value={providerValue}>
      {children}
    </AxiosPrivateContext.Provider>
  );
};

const useAxiosPrivate = () => {
  const context = useContext(AxiosPrivateContext);

  if (!context) {
    throw new Error(
      "useAxiosPrivate needs to be called inside AxiosPrivateContext Provider"
    );
  }

  return context;
};

export { AxiosPrivateProvider as default, useAxiosPrivate };
