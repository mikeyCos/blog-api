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
import { AxiosInstance } from "axios";
import router from "../config/router.config";

// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
// Need to check roles of logged in user
//  Admins, they can read, write, delete anyone's material and comments
//  Authors, can only read, write, delete their own material and user comments under their blog
type Login = (newToken: string) => void;
type Logout = () => Promise<null>;
type Authorize = () => Promise<void>;

export interface AuthContext {
  login: Login;
  logout: Logout;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  authorize: Authorize;
  updateLoading: (newUpdateLoading: boolean) => void;
  initAuth: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
  accessToken: string | null;
  updateAccessToken: (newAccessToken: string | null) => void;
  axiosPrivate: AxiosInstance;
}

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  accessToken,
  updateAccessToken,
  axiosPrivate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const initialAuthRef = useRef(true);

  const updateLoading = useCallback((newUpdateLoading: boolean) => {
    setIsLoading(newUpdateLoading);
  }, []);

  const refreshToken = useRefreshToken();

  const login: Login = useCallback((newToken) => {
    console.group("[AuthProvider] login running...");
    console.log("newToken:", newToken);
    console.groupEnd();
    updateAccessToken(newToken);
    setIsAuthenticated(true);
  }, []);

  const logout: Logout = useCallback(async () => {
    console.group("[AuthProvider] logout running...");
    console.groupEnd();
    await axiosPrivate.post("/auth/logout");
    return axiosPrivate.post("/auth/logout").then((_resolve) => {
      return new Promise(async (resolve) => {
        updateAccessToken(null);
        setIsAuthenticated(false);
        router.invalidate();
        setTimeout(() => resolve(null), 0);
      });
    });
  }, []);

  const authorize = useCallback(async () => {
    console.log("[AuthProvider] authorize running...");
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
        throw err;
      }
    }
  }, []);

  const initAuth = useCallback(async () => {
    console.log("[AuthProvider] initAuth running...");
    console.log("isLoading:", isLoading);
    console.log("initialAuthRef.current:", initialAuthRef.current);
    try {
      const refreshResponse = await refreshToken();
      console.log("refreshResponse.accessToken:", refreshResponse.accessToken);
      login(refreshResponse.accessToken);
    } catch (err) {
      console.error(err);
      updateAccessToken(null);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.group("[AuthProvider] mounted...");
    console.log("isAuthenticated:", isAuthenticated);
    console.groupEnd();

    // if (!accessToken) {
    //   initAuth();
    // }

    // setIsLoading(false);
  }, []);

  const AuthProviderValue = useMemo(() => {
    return {
      login,
      logout,
      isLoading,
      isAuthenticated,
      accessToken,
      authorize,
      axiosPrivate,
      updateLoading,
      initAuth,
    };
  }, [accessToken, isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
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

export { AuthProvider as default, useAuth };
