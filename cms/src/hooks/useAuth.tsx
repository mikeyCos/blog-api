import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useRefreshToken from "./useRefreshToken";
import axios, { AxiosError, AxiosInstance } from "axios";
import config from "../config/env.config";
import router from "../config/router.config";
import { useLocation } from "@tanstack/react-router";

// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
// Need to check roles of logged in user
//  Admins, they can read, write, delete anyone's material and comments
//  Authors, can only read, write, delete their own material and user comments under their blog
type InitAuth = () => Promise<void>;
type Login = (newToken: string) => void;
type Logout = () => Promise<null>;
// type Logout = () => void;
type Authorize = () => Promise<boolean>;

export type AxiosPrivateContext = AxiosInstance;

export interface AuthContext {
  login: Login;
  logout: Logout;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  authorize: Authorize;
  axiosPrivate: AxiosInstance;
  updateLoading: (newUpdateLoading: boolean) => void;
}

interface FailedRequests {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}

const AuthContext = createContext<AuthContext | null>(null);
const AxiosPrivateContext = createContext<AxiosPrivateContext | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("AuthProvider running...");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedRequests, setFailedRequests] = useState<FailedRequests[]>([]);

  const initialAuthRef = useRef(true);

  const updateLoading = useCallback((newUpdateLoading: boolean) => {
    setIsLoading(newUpdateLoading);
  }, []);

  const refreshToken = useRefreshToken();

  const getAccessToken = useCallback(() => {
    return accessToken;
  }, [accessToken]);

  const updateAccessToken = useCallback((newToken: string | null) => {
    setAccessToken(newToken);
  }, []);

  const login: Login = useCallback(
    (newToken) => {
      console.group("login from AuthProvider running...");
      console.log("newToken:", newToken);
      console.groupEnd();
      setAccessToken(newToken);
      setIsAuthenticated(true);
      // router.invalidate();
    },
    [setAccessToken]
  );

  const retryFailedRequests = useCallback(
    (error: AxiosError | null = null) => {
      failedRequests.forEach((request) => {
        if (error) {
          request.reject(error);
        } else {
          if (accessToken) {
            request.resolve(accessToken);
          } else {
            // This is unlikely to happen after successful request to /auth/refresh
            request.reject(
              new Error("Access token is null after /auth/refresh")
            );
          }
        }
      });
      setFailedRequests([]);
    },
    [failedRequests, accessToken]
  );

  const axiosPrivate = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: config.blogAPIBase,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Attaches access token to request
    axiosInstance.interceptors.request.use(
      (config) => {
        console.group("useAxiosPrivate requestInterceptor");
        console.log("config.url:", config.url);
        console.log("requestInterceptor accessToken:", accessToken);
        console.groupEnd();
        const currentAccessToken = getAccessToken();
        if (currentAccessToken) {
          config.headers.Authorization = `Bearer ${currentAccessToken}`;
        } else {
          console.log("accessToken not set");
        }

        console.log("config.headers:", config.headers);
        return config;
      },
      (err) => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;

        if (
          (err.request.status === 403 || err.request.status === 401) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          // If there is an existing request to /auth/refresh
          // Add latest failed request to failedRequests array
          if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              setFailedRequests((prev) => [...prev, { resolve, reject }]);
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          // If there is no existing request to /auth/refresh
          // Allows only one request to /auth/refresh
          setIsRefreshing(true);

          return new Promise(async (resolve, reject) => {
            try {
              const refreshResponse = await refreshToken();
              const newAccessToken = refreshResponse.accessToken;
              updateAccessToken(newAccessToken);

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              retryFailedRequests();
              resolve(axiosInstance(originalRequest));
            } catch (refreshErr: any) {
              console.log("refreshErr:", refreshErr);
              retryFailedRequests(refreshErr);
              setAccessToken(null);
              reject(refreshErr);
            } finally {
              setIsRefreshing(false);
            }
          });
        }
      }
    );

    return axiosInstance;
  }, [
    getAccessToken,
    isRefreshing,
    setIsRefreshing,
    setFailedRequests,
    updateAccessToken,
  ]);

  const logout: Logout = useCallback(async () => {
    console.group("logout from AuthProvider running...");
    // console.log("location:", location);
    console.groupEnd();
    await axiosPrivate.post("/auth/logout");
    // setAccessToken(null);
    // setIsAuthenticated(false);
    // router.invalidate();
    return axiosPrivate.post("/auth/logout").then((_resolve) => {
      return new Promise(async (resolve) => {
        setAccessToken(null);
        setIsAuthenticated(false);
        setTimeout(() => resolve(null), 0);
      });
    });
  }, []);

  const authorize = useCallback(async () => {
    console.log("authorize running...");
    try {
      await axiosPrivate.get("/auth");
      // const newAccessToken = getGlobalAccessToken();
      const refreshResponse = await refreshToken();
      console.log("refreshResponse:", refreshResponse.accessToken);
      setAccessToken(refreshResponse.accessToken);
      return true;
    } catch (err) {
      console.error(err);
      if (err instanceof Error && isAuthenticated) {
        console.log("err instanceof Error:", err instanceof Error);
        console.log("[authorize] err:", err);
        // How to throw error to Tanstack Router errorElement?
        // throwError(err);
      } else {
        setAccessToken(null);
        setIsAuthenticated(false);
      }
      return false;
    }
  }, [
    axiosPrivate,
    accessToken,
    isAuthenticated,
    setAccessToken,
    setIsAuthenticated,
  ]);

  const initAuth = useCallback(async () => {
    console.log("initAuth running...");
    try {
      const refreshResponse = await refreshToken();
      console.log("refreshResponse.accessToken:", refreshResponse.accessToken);
      login(refreshResponse.accessToken);
    } catch (err) {
      console.error(err);
      setAccessToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      console.log("[useAuth initAuth finally...]");
    }
  }, []);

  useEffect(() => {
    console.group("AuthProvider mounted...");
    console.log("isAuthenticated:", isAuthenticated);
    console.groupEnd();

    if (!accessToken) {
      initAuth();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && initialAuthRef.current) {
      router.invalidate();
    }

    if (isLoading === false && initialAuthRef.current) {
      initialAuthRef.current = false;
    }
  }, [isAuthenticated, accessToken, isLoading, router]);

  const AuthProviderValue = useMemo(() => {
    return {
      login,
      logout,
      isLoading,
      isAuthenticated,
      accessToken,
      setAccessToken,
      authorize,
      axiosPrivate,
      updateLoading,
    };
  }, [accessToken, isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      <AxiosPrivateContext.Provider value={axiosPrivate}>
        {children}
      </AxiosPrivateContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth needs to be called inside AuthContext Provider.");
  }

  return context;
};

const useAxiosPrivate = () => {
  const context = useContext(AxiosPrivateContext);

  if (!context) {
    throw new Error(
      "useAxiosPrivate needs to be called inside AxiosPrivateContext Provider."
    );
  }

  return context;
};

export { AuthProvider as default, useAuth, useAxiosPrivate };
