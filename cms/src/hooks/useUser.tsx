import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthenticatedUser } from "../interfaces/user";
import { useAuth } from "./useAuth";
import { AuthUserResponse } from "../interfaces/responses";
import useAxiosPrivate from "./useAxiosPrivate";
import { Post } from "../interfaces/blog";

interface AddPost {
  (newPost: Post): void;
}

type status = "loading" | "unauthenticated" | "authenticated";

interface UserContextAuthenticated {
  status: status;
  user: AuthenticatedUser;
  addPost: AddPost;
}

interface UserContextUnauthenticated {
  status: status;
  user: null;
  addPost: AddPost;
}

export type UserContextType =
  | UserContextUnauthenticated
  | UserContextAuthenticated;

const UserContext = createContext<UserContextType>({
  status: "unauthenticated",
  user: null,
  addPost: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, isAuthenticated } = useAuth();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const addPost: AddPost = (newPost) => {
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

    if (accessToken) {
      // Send GET request to API to get user profile
      getUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  if (false) {
  }
  const useUserValue = useMemo<UserContextType>(() => {
    if (isAuthenticated) {
      return {
        status: "authenticated",
        user,
        addPost,
      };
    }

    return {
      status: "unauthenticated",
      user: null,
      addPost: () => {},
    };
  }, [user]);

  return (
    <UserContext.Provider value={useUserValue}>{children}</UserContext.Provider>
  );
};

// I wish a generic type could be provided to useContext on consumption
const useUserData = () => {
  return useContext(UserContext);
};

export { UserProvider as default, useUserData };
