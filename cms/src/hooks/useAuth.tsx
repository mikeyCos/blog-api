import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios, { axiosInit } from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";
// import { useNavigate } from "react-router";

// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
type Login = (newToken: string) => void;
type Logout = () => Promise<null>;
// type Logout = () => void;

interface AuthContext {
  login: Login;
  logout: Logout;
  accessToken: string | null;
  setAccessToken: Dispatch<
    string | null | ((prevState: string | null) => string | null)
  >;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("AuthProvider running...");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const refresh = useRefreshToken();
  // const navigate = useNavigate();

  const login: Login = (newToken) => {
    console.log("login from AuthProvider running...");
    console.log("newToken:", newToken);
    setAccessToken(newToken);
  };

  const logout: Logout = async () => {
    console.log("logout from AuthProvider running...");
    return axios.post("/auth/logout").then((_resolve) => {
      return new Promise(async (res) => {
        setAccessToken(null);
        setTimeout(() => res(null), 0);
      });
    });
  };

  useEffect(() => {
    console.log("AuthProvider mounted...");
    console.log("accessToken:", accessToken);
    const requestInterceptor = axiosInit.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const fetchToken = async () => {
      try {
        const response = await refresh();
        console.log("response:", response);
        setAccessToken(response.data.data.accessToken);
      } catch (err) {
        console.log("error:", err);
        setAccessToken(null);
      }
    };

    fetchToken();
    return () => {
      console.log("useAuth clean up function running...");
      // axiosInit.interceptors.response.eject(responseInterceptor);
      axiosInit.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const providerValue = useMemo(() => {
    return {
      login,
      logout,
      accessToken,
      setAccessToken,
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider as default, useAuth };
