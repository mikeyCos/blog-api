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
  const axiosPrivate = useAxiosPrivate();
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
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

  useEffect(() => {
    console.group("[UserProvider] mounted");
    console.log("[UserProvider] accessToken:", accessToken);
    console.groupEnd();

    const getUser = async () => {
      console.log("[useUser] getUser running...");
      try {
        // Why is the accessToken not getting attached to the request?
        console.group("getUser tryblock running...");
        console.log(
          `[getUser] accessToken: ${accessToken}, isAuthenticated: ${isAuthenticated}`
        );
        console.groupEnd();
        const response = await axiosPrivate.get<AuthUserResponse>("/auth/user");
        setUser(response.data.user);
        console.log("response:", response);
      } catch (err) {
        setUser(null);
        console.error(err);
      } finally {
        setIsUserDataLoading(false);
      }
    };

    if (accessToken) {
      getUser();
    }
  }, [accessToken, axiosPrivate]);

  const providerValue = useMemo<UserContextType>(() => {
    console.group("providerValue useMemo running...");
    console.log("user:", user);
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
  }, [
    user,
    isAuthenticated,
    isUserDataLoading,
    addPost,
    updatePost,
    removePost,
  ]);

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
