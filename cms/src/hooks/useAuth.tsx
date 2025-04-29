import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import useLocalStorage from "./useLocalStorage";

import config from "../config/env.config";
// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
type Login = (newToken: string) => void;
type Logout = () => void;

interface AuthContext {
  login: Login;
  logout: Logout;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState(null);

  const login: Login = async (newToken) => {
    console.log("login from AuthProvider running...");
    // setToken(newToken);
    // setIsAuthorized(true);
    // setIsLoggedOut(false);
  };

  const logout: Logout = async () => {
    console.log("logout from AuthProvider running...");
    // setToken(null);
    // setIsAuthorized(false);
    // setIsLoggedOut(true);
  };

  useEffect(() => {
    const fetchToken = async () => {
      await fetch(`${config.blogAPIBase}/auth`, {
        method: "GET",
        headers: {
          authorization: `${accessToken}`,
        },
      }).then(async (res) => {
        if (!res.ok) return setAccessToken(null);
        const result = await res.json();
        setAccessToken(result.data.access_token);
      });

      /* await axios({
        method: "GET",
        url: `${config.blogAPIBase}/auth`,
        headers: { Authorization: accessToken },
      }).then(async (res) => {
        console.log(res);
      }); */
    };

    if (accessToken) {
      fetchToken();
    }
  }, []);

  const providerValue = useMemo(() => {
    return {
      login,
      logout,
      accessToken,
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
