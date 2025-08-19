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
import { Post } from "../interfaces/blog";
import { useAxiosPrivate } from "./useAxiosPrivate";
import router from "../config/router.config";

interface PostCallback<T> {
  (param: T): void;
}

type status = "loading" | "unauthenticated" | "authenticated";

interface UserContextBase {
  status: status;
  addPost: PostCallback<Post>;
  updatePost: PostCallback<Post>;
  removePost: PostCallback<string>;
  isLoading: boolean;
  getUser: () => Promise<void>;
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
  addPost: () => {},
  updatePost: () => {},
  removePost: () => {},
  isLoading: true,
  getUser: () => new Promise(() => {}),
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, isAuthenticated } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

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

  const getUser = async () => {
    console.log("[useUser] getUser running...");
    try {
      console.group("getUser tryblock running...");
      console.groupEnd();
      const response = await axiosPrivate.get<AuthUserResponse>("/auth/user");
      const user = response.data.user;
      setUser(user);
      console.log("[UserProvider] getUser response:", response);
      return user;
    } catch (err) {
      setUser(null);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const providerValue = useMemo<UserContextType>(() => {
    if (isAuthenticated) {
      return {
        status: "authenticated",
        user,
        addPost,
        updatePost,
        removePost,
        isLoading,
        getUser,
      };
    }

    return {
      status: "unauthenticated",
      user: null,
      addPost: () => {},
      updatePost: () => {},
      removePost: () => {},
      isLoading,
      getUser,
    };
  }, [user, isAuthenticated, isLoading, addPost, updatePost, removePost]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

// I wish a generic type could be provided to useContext on consumption
const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("useUserData needs to be called inside UserContext Provider.");
  }
  return context;
};

export { UserProvider as default, useUserData };
