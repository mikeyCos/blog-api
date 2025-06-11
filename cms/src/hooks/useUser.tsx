import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../interfaces/user";
import { useAuth } from "./useAuth";
import { axiosPrivate } from "../config/axios.config";
import { AuthUserResponse } from "../interfaces/responses";

interface UserContext {
  username?: string;
}

const UserContext = createContext<UserContext>({} as UserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  // const addPost = (post) => {};

  useEffect(() => {
    console.log("UserProvider mounted");
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get<AuthUserResponse>("/auth/user");
        setUser(response.data.user);
        console.log("response:", response);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      // Send GET request to API to get user profile
      getUser();
    }
  }, [isAuthenticated]);

  const useUserValue = useMemo(() => {
    return {
      username: user?.username,
    };
  }, [user]);

  return (
    <UserContext.Provider value={useUserValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider as default, useUser };
