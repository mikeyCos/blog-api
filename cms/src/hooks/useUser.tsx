import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../interfaces/user";
import { useAuth } from "./useAuth";
import { AuthUserResponse } from "../interfaces/responses";
import useAxiosPrivate from "./useAxiosPrivate";
import { Post } from "../interfaces/blog";

interface UserContext {
  user?: User | null;
  addPost: (newPost: Post) => void;
}

const UserContext = createContext<UserContext>({} as UserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const addPost = (newPost: Post) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        ...(prevUser.blog && {
          blog: { ...prevUser.blog, posts: [...prevUser.blog.posts, newPost] },
        }),
      };
    });
  };

  useEffect(() => {
    console.log("UserProvider mounted");
    const getUser = async () => {
      if (isAuthenticated) {
        try {
          const response = await axiosPrivate.get<AuthUserResponse>(
            "/auth/user"
          );
          setUser(response.data.user);
          console.log("response:", response);
        } catch (err) {
          console.error(err);
        }
      }
    };

    console.log("accessToken in UserProvider:", accessToken);
    if (accessToken) {
      // Send GET request to API to get user profile
      getUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const useUserValue = useMemo(() => {
    return { user, addPost };
  }, [user]);

  return (
    <UserContext.Provider value={useUserValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider as default, useUser };
