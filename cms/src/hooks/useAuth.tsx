import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// import axios from "axios";
import axios from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";

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

  const login: Login = async (newToken) => {
    console.log("login from AuthProvider running...");
    console.log("newToken:", newToken);
    setAccessToken(newToken);
    // setToken(newToken);
    // setIsAuthorized(true);
    // setIsLoggedOut(false);
  };

  const logout: Logout = async () => {
    console.log("logout from AuthProvider running...");
    /* return new Promise(async (res) => {
      const response = await axios.post("/auth/logout");
      console.log("response:", response);
      setAccessToken(null);
      setTimeout(() => res(null), 0);
    }); */

    return axios.post("/auth/logout").then((resolve) => {
      return new Promise(async (res) => {
        setAccessToken(null);
        setTimeout(() => res(null), 0);
      });
    });
  };

  useEffect(() => {
    console.log("AuthProvider mounted...");
    console.log("accessToken:", accessToken);
    console.log("setAccessToken:", setAccessToken);
    // What if accessToken is null?
    const fetchToken = async () => {
      try {
        const response = await axios.post("/auth/refresh", {
          headers: {
            ...(accessToken && {}),
          },
        });
        console.log("response:", response);
        setAccessToken(response.data.data.accessToken);
      } catch (err) {
        console.log("err:", err);
        setAccessToken(null);
      }
    };

    fetchToken();
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
