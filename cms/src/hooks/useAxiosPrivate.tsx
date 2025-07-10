import React, { createContext, useContext, useEffect, useMemo } from "react";
import { axiosPrivate } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { AxiosInstance } from "axios";

interface AxiosPrivateContext {
  axiosPrivate: AxiosInstance;
}

const AxiosPrivateContext = createContext<AxiosPrivateContext | null>(null);

const useAxiosPrivateInit = (
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const refresh = useRefreshToken();
  useEffect(() => {
    console.group("useAxiosPrivate mounted...");
    console.groupEnd();
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("requestInterceptor useAxiosPrivate");
        console.log("config.url:", config.url);
        console.log("requestInterceptor accessToken:", accessToken);
        if (accessToken) {
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
        console.group("responseInterceptor err handler running...");
        console.groupEnd();
        if (err.request.status === 403 || err.request.status === 401) {
          console.log("responseInterceptor accessToken:", accessToken);
          const refreshResponse = await refresh();
          console.log("refreshResponse:", refreshResponse);
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
  }, [accessToken]);

  return axiosPrivate;
};

const AxiosPrivateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, setAccessToken } = useAuth();
  console.group("AxiosPrivateProvider rendering...");
  console.log("accessToken:", accessToken);
  console.groupEnd();
  const axiosPrivate = useAxiosPrivateInit(accessToken, setAccessToken);

  const providerValue = useMemo(() => {
    console.group("useMemo");
    console.log("accessToken:", accessToken);
    console.groupEnd();
    return { axiosPrivate };
  }, [accessToken]);

  return (
    <AxiosPrivateContext.Provider value={providerValue}>
      {children}
    </AxiosPrivateContext.Provider>
  );
};

const useAxiosPrivate = () => {
  const context = useContext(AxiosPrivateContext);

  if (!context) {
    throw new Error("usAxiosPrivateContext");
  }

  return context;
};

export {
  AxiosPrivateProvider as default,
  useAxiosPrivateInit,
  useAxiosPrivate,
};
