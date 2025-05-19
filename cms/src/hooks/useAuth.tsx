import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios, { axiosInit } from "../config/axios.config";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const login: Login = (newToken) => {
    console.log("login from AuthProvider running...");
    console.log("newToken:", newToken);
    setAccessToken(newToken);
    // setToken(newToken);
    // setIsAuthorized(true);
    // setIsLoggedOut(false);
  };

  const logout: Logout = async () => {
    console.log("logout from AuthProvider running...");
    return axios.post("/auth/logout").then((resolve) => {
      return new Promise(async (res) => {
        setAccessToken(null);
        setTimeout(() => res(null), 0);
      });
    });

    /* axios.post("/auth/logout");
    setAccessToken(null);
    navigate("/"); */
  };

  useEffect(() => {
    console.log("AuthProvider mounted...");
    console.log("accessToken:", accessToken);
    // What if accessToken is null?
    /* const responseInterceptor = axiosInit.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log("err:", err);
        return Promise.resolve(err);
      }
    ); */

    const fetchToken = async () => {
      if (accessToken)
        axiosInit.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      try {
        const response = await axiosInit.post("/auth/refresh?init=true");
        setAccessToken(response.data.data.accessToken);
        console.log("response:", response);
      } catch (err) {
        console.log("error:", err);
        setAccessToken(null);
      }
    };

    fetchToken();
    /* return () => {
      axiosInit.interceptors.response.eject(responseInterceptor);
    }; */
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
