import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthenticatedUser } from "../interfaces/user";
import { useAuth } from "./useAuth";
import { AuthUserResponse } from "../interfaces/responses";
import { Post } from "../interfaces/blog";
import { useAxiosPrivate } from "./useAxiosPrivate";
import queryClient from "../config/query.config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../entities/user/api/queries";

interface PostCallback<T> {
  (param: T): void;
}

type status = "loading" | "unauthenticated" | "authenticated";

interface UserContextBase {
  status: status;
  // addPost: PostCallback<Post>;
  // updatePost: PostCallback<Post>;
  // removePost: PostCallback<string>;
  // isLoading: boolean;
  // updateUser: PostCallback<AuthenticatedUser | null>;
}

interface UserContextAuthenticated extends UserContextBase {
  user: AuthenticatedUser;
}

interface UserContextUnauthenticated extends UserContextBase {
  user: null;
}

export type UserContextType =
  | UserContextUnauthenticated
  | UserContextAuthenticated;

const UserContext = createContext<UserContextType>({
  status: "unauthenticated",
  user: null,
  // addPost: () => {},
  // updatePost: () => {},
  // removePost: () => {},
  // isLoading: true,
  // updateUser: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("[UserProvider] rendering...");
  // const { accessToken, isAuthenticated } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => getAuthenticatedUser(axiosPrivate),
  // });

  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<AuthenticatedUser | null>(null);

  // const addPost: PostCallback<Post> = (newPost) => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return prevUser;

  //     return {
  //       ...prevUser,
  //       ...(prevUser.blog && {
  //         blog: { ...prevUser.blog, posts: [...prevUser.blog.posts, newPost] },
  //       }),
  //     };
  //   });
  // };

  // const updatePost: PostCallback<Post> = (newPost) => {
  //   setUser((prevUser) => {
  //     if (prevUser?.blog) {
  //       const posts = prevUser.blog.posts.map((post) => {
  //         if (post.id !== newPost.id) return post;
  //         return newPost;
  //       });

  //       return {
  //         ...prevUser,
  //         blog: { ...prevUser.blog, posts },
  //       };
  //     }

  //     return prevUser;
  //   });
  // };

  // const removePost: PostCallback<string> = (postId) => {
  //   setUser((prevUser) => {
  //     if (prevUser?.blog) {
  //       const posts = prevUser.blog.posts.filter((post) => {
  //         if (post.id !== postId) return post;
  //       });

  //       return {
  //         ...prevUser,
  //         blog: { ...prevUser.blog, posts },
  //       };
  //     }

  //     return prevUser;
  //   });
  // };

  // const updateUser = useCallback((newUser: null | AuthenticatedUser) => {
  //   setUser(newUser);
  // }, []);

  const providerValue = useMemo<UserContextType>(() => {
    // const status = user ? "authenticated" : "unauthenticated";
    const status = "unauthenticated";
    return {
      status,
      user: null,
    };
  }, []);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

// I wish a generic type could be provided to useContext on consumption
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("useUserData needs to be called inside UserContext Provider.");
  }
  return context;
};

export { UserProvider as default, useUser };
