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
import { useAxiosPrivate } from "./useAxiosPrivate";
import { Post } from "../interfaces/blog";

interface PostCallback<T> {
  (param: T): void;
}

type status = "loading" | "unauthenticated" | "authenticated";

interface UserContextAuthenticated {
  status: status;
  user: AuthenticatedUser;
  addPost: PostCallback<Post>;
  updatePost: PostCallback<Post>;
  removePost: PostCallback<string>;
  isUserDataLoading: boolean;
}

interface UserContextUnauthenticated {
  status: status;
  user: null;
  addPost: PostCallback<Post>;
  updatePost: PostCallback<Post>;
  removePost: PostCallback<string>;
  isUserDataLoading: boolean;
}

export type UserContextType =
  | UserContextUnauthenticated
  | UserContextAuthenticated;

const UserContext = createContext<UserContextType>({
  status: "unauthenticated",
  user: null,
  addPost: () => {},
  updatePost: () => {},
  removePost: () => {},
  isUserDataLoading: true,
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, isAuthenticated } = useAuth();
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const { axiosPrivate } = useAxiosPrivate();

  const addPost: PostCallback<Post> = (newPost) => {
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

  const updatePost: PostCallback<Post> = (newPost) => {
    setUser((prevUser) => {
      if (prevUser?.blog) {
        const posts = prevUser.blog.posts.map((post) => {
          if (post.id !== newPost.id) return post;
          return newPost;
        });

        return {
          ...prevUser,
          blog: { ...prevUser.blog, posts },
        };
      }

      return prevUser;
    });
  };

  const removePost: PostCallback<string> = (postId) => {
    setUser((prevUser) => {
      if (prevUser?.blog) {
        const posts = prevUser.blog.posts.filter((post) => {
          if (post.id !== postId) return post;
        });

        return {
          ...prevUser,
          blog: { ...prevUser.blog, posts },
        };
      }

      return prevUser;
    });
  };

  useEffect(() => {
    console.group("UserProvider mounted");
    console.groupEnd();
    const getUser = async () => {
      console.group("getUser running...");
      try {
        // Why is the accessToken not getting attached to the request?
        console.log(
          `accessToken: ${accessToken}, isAuthenticated: ${isAuthenticated}`
        );
        const response = await axiosPrivate.get<AuthUserResponse>("/auth/user");
        setUser(response.data.user);
        console.log("response:", response);
      } catch (err) {
        setUser(null);
        console.error(err);
      } finally {
        setIsUserDataLoading(false);
      }
      console.groupEnd();
    };

    // getUser();
    if (accessToken && isAuthenticated) {
      console.log("accessToken && isAuthenticate");
      getUser();
    } else {
      console.log("accessToken && isAuthenticate ELSE");
      setUser(null);
    }
  }, [isAuthenticated]);

  const useUserValue = useMemo<UserContextType>(() => {
    console.group("useUserValue useMemo running...");
    console.log(user);
    console.groupEnd();
    if (isAuthenticated) {
      return {
        status: "authenticated",
        user,
        addPost,
        updatePost,
        removePost,
        isUserDataLoading,
      };
    }

    return {
      status: "unauthenticated",
      user: null,
      addPost: () => {},
      updatePost: () => {},
      removePost: () => {},
      isUserDataLoading,
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
