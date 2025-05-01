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

// TODO
// Need to set type for createContext, useState, and user
// https://reacttraining.com/blog/react-context-with-typescript
type Login = (newToken: string) => void;
type Logout = () => void;

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
  const [accessToken, setAccessToken] = useState<string | null>(null);

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
    setAccessToken(null);
    // setToken(null);
    // setIsAuthorized(false);
    // setIsLoggedOut(true);
  };

  useEffect(() => {
    console.log("useEffect in useAuth running...");
    console.log(accessToken);
    // What if accessToken is null?
    const fetchToken = async () => {
      await axios
        .get("/auth", {
          headers: {
            ...(accessToken && {}),
          },
        })
        .then(async (res) => {
          console.log("res:", res);
        });
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
