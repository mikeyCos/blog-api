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
import useAxiosPrivateConfig from "./useAxiosPrivate";

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
type Authorize = () => Promise<void>;

export type AxiosPrivateContext = AxiosInstance;

export interface AuthContext {
  login: Login;
  logout: Logout;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  // updateAccessToken: (newAccessToken: string | null) => void; // TESTING
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  authorize: Authorize;
  axiosPrivate: AxiosInstance;
  updateLoading: (newUpdateLoading: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  // accessToken: string | null;
  // updateAccessToken: (newAccessToken: string | null) => void;
  // axiosPrivate: AxiosInstance;
}

const AuthContext = createContext<AuthContext | null>(null);
const AxiosPrivateContext = createContext<AxiosPrivateContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  // accessToken,
  // updateAccessToken,
  // axiosPrivate,
}) => {
  console.log("[AuthProvider] rendering...");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const [failedRequests, setFailedRequests] = useState<FailedRequests[]>([]);

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
      // updateAccessToken(newToken); // TESTING
      setIsAuthenticated(true);
      // router.invalidate();
    },
    [updateAccessToken]
  );

  const axiosPrivate = useAxiosPrivateConfig({
    accessToken,
    setAccessToken,
    getAccessToken,
    updateAccessToken,
  });

  const logout: Logout = useCallback(async () => {
    console.group("[AuthProvider] logout running...");
    // console.log("location:", location);
    console.groupEnd();
    await axiosPrivate.post("/auth/logout");
    return axiosPrivate.post("/auth/logout").then((_resolve) => {
      return new Promise(async (resolve) => {
        updateAccessToken(null);
        setIsAuthenticated(false);
        setTimeout(() => resolve(null), 0);
      });
    });
  }, []);

  const authorize = useCallback(async () => {
    console.log("authorize running...");
    try {
      await axiosPrivate.get("/auth");
    } catch (err) {
      console.error(err);
      updateAccessToken(null);
      setIsAuthenticated(false);
      if (err instanceof Error && isAuthenticated) {
        console.log("err instanceof Error:", err instanceof Error);
        console.log("[authorize] err:", err);
        // How to throw error to Tanstack Router errorElement?
        // throwError(err);
        throw err;
      }
    }
  }, [
    axiosPrivate,
    accessToken,
    isAuthenticated,
    updateAccessToken,
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
      updateAccessToken(null);
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
      // updateAccessToken,
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

const useAxiosPrivateContext = () => {
  const context = useContext(AxiosPrivateContext);

  if (!context) {
    throw new Error(
      "useAxiosPrivate needs to be called inside AxiosPrivateContext Provider."
    );
  }

  return context;
};

export { AuthProvider as default, useAuth, useAxiosPrivateContext };
