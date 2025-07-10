import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
import { useUserData } from "./useUser";
import router from "../config/router.config";
import { useAxiosPrivateInit } from "./useAxiosPrivate";

// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
// Need to check roles of logged in user
//  Admins, they can read, write, delete anyone's material and comments
//  Authors, can only read, write, delete their own material and user comments under their blog
type Login = (newToken: string) => void;
type Logout = () => Promise<null>;
type Authorize = () => Promise<boolean>;

export interface AuthContext {
  login: Login;
  logout: Logout;
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  authorize: Authorize;
}

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.group("AuthProvider running...");
  console.groupEnd();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivateInit(accessToken, setAccessToken);

  const login: Login = (newToken) => {
    console.log("login from AuthProvider running...");
    console.log("newToken:", newToken);
    setAccessToken(newToken);
    setIsAuthenticated(true);
  };

  const logout: Logout = async () => {
    console.log("logout from AuthProvider running...");
    return axios.post("/auth/logout").then((_resolve) => {
      return new Promise(async (resolve) => {
        setAccessToken(null);
        setIsAuthenticated(false);
        setTimeout(() => resolve(null), 0);
      });
    });
  };

  const authorize = async () => {
    console.group("authorize running...");
    try {
      await axiosPrivate.get("/auth");
      return true;
    } catch (err) {
      console.error(err);
      if (err instanceof Error && isAuthenticated) {
        console.log(err);
        console.log("err instanceof Error:", err instanceof Error);
        console.groupEnd();
        // How to throw error to Tanstack Router errorElement?
        // throwError(err);
      } else {
        setAccessToken(null);
        setIsAuthenticated(false);
      }
      return false;
    }
  };

  useEffect(() => {
    console.log("AuthProvider mounted...");
    const refresh = useRefreshToken();

    const initAuth = async () => {
      console.log("initAuth running...");
      try {
        const refreshResponse = await refresh();
        login(refreshResponse.accessToken);
      } catch (err) {
        console.error(err);
        setAccessToken(null);
        setIsAuthenticated(false);
      }
    };

    initAuth();
  }, []);

  const providerValue = useMemo(() => {
    return {
      login,
      logout,
      isAuthenticated,
      accessToken,
      setAccessToken,
      authorize,
    };
  }, [accessToken, isAuthenticated]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth needs to be called inside AuthContext Provider.");
  }

  return context;
};

export { AuthProvider as default, useAuth };
