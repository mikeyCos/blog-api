import React, { createContext, useContext, useMemo, useState } from "react";

import useLocalStorage from "./useLocalStorage";
// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
type Login = (newToken: string) => void;
type Logout = () => void;

interface AuthContext {
  login: Login;
  logout: Logout;
  token: string;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useLocalStorage("token", null);

  const login: Login = async (newToken) => {
    setToken(newToken);
  };

  const logout: Logout = () => {
    setToken(null);
  };

  const providerValue = useMemo(() => {
    return {
      login,
      logout,
      token,
    };
  }, [token]);

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
