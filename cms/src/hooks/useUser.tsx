import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthenticatedUser } from "../interfaces/user";
import { useAuth, useAxiosPrivate } from "./useAuth";
import { AuthUserResponse } from "../interfaces/responses";
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
  const { accessToken, setAccessToken, isAuthenticated } = useAuth();
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
    const getUser = async () => {
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

    console.group("UserProvider mounted");
    console.log("[UserProvider] accessToken:", accessToken);
    console.groupEnd();

    if (accessToken) {
      getUser();
    } else {
      // setUser(null);
    }
  }, [accessToken, axiosPrivate]);

  const providerValue = useMemo<UserContextType>(() => {
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

// TESTING
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { AuthenticatedUser } from "../interfaces/user";
// import { useAuth } from "./useAuth"; // Import useAuth
// import { AuthUserResponse } from "../interfaces/responses";
// import { Post } from "../interfaces/blog";
// import {
//   AxiosInterceptorManager,
//   InternalAxiosRequestConfig,
//   AxiosResponse,
// } from "axios"; // Import types for casting

// interface PostCallback<T> {
//   (param: T): void;
// }

// type status = "loading" | "unauthenticated" | "authenticated";

// interface UserContextAuthenticated {
//   status: status;
//   user: AuthenticatedUser;
//   addPost: PostCallback<Post>;
//   updatePost: PostCallback<Post>;
//   removePost: PostCallback<string>;
//   isUserDataLoading: boolean;
// }

// interface UserContextUnauthenticated {
//   status: status;
//   user: null;
//   addPost: PostCallback<Post>;
//   updatePost: PostCallback<Post>;
//   removePost: PostCallback<string>;
//   isUserDataLoading: boolean;
// }

// export type UserContextType =
//   | UserContextUnauthenticated
//   | UserContextAuthenticated;

// const UserContext = createContext<UserContextType>({
//   status: "unauthenticated",
//   user: null,
//   addPost: () => {},
//   updatePost: () => {},
//   removePost: () => {},
//   isUserDataLoading: true,
// });

// const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Destructure axiosPrivate and interceptorsReadyPromise directly from useAuth
//   const {
//     accessToken,
//     isAuthenticated,
//     axiosPrivate,
//     interceptorsReadyPromise,
//   } = useAuth();

//   const [isUserDataLoading, setIsUserDataLoading] = useState(true);
//   const [user, setUser] = useState<AuthenticatedUser | null>(null);

//   const addPost: PostCallback<Post> = (newPost) => {
//     setUser((prevUser) => {
//       if (!prevUser) return prevUser;

//       return {
//         ...prevUser,
//         ...(prevUser.blog && {
//           blog: { ...prevUser.blog, posts: [...prevUser.blog.posts, newPost] },
//         }),
//       };
//     });
//   };

//   const updatePost: PostCallback<Post> = (newPost) => {
//     setUser((prevUser) => {
//       if (prevUser?.blog) {
//         const posts = prevUser.blog.posts.map((post) => {
//           if (post.id !== newPost.id) return post;
//           return newPost;
//         });

//         return {
//           ...prevUser,
//           blog: { ...prevUser.blog, posts },
//         };
//       }

//       return prevUser;
//     });
//   };

//   const removePost: PostCallback<string> = (postId) => {
//     setUser((prevUser) => {
//       if (prevUser?.blog) {
//         const posts = prevUser.blog.posts.filter((post) => {
//           if (post.id !== postId) return post;
//         });

//         return {
//           ...prevUser,
//           blog: { ...prevUser.blog, posts },
//         };
//       }

//       return prevUser;
//     });
//   };

//   useEffect(() => {
//     console.group("UserProvider useEffect running...");
//     console.log(
//       "Current accessToken in UserProvider:",
//       accessToken ? "PRESENT" : "ABSENT"
//     );
//     console.log("Current isAuthenticated in UserProvider:", isAuthenticated);
//     console.log(
//       "UserProvider: axiosPrivate instance ID (from AuthContext):",
//       (axiosPrivate as any).__instanceId
//     );
//     console.groupEnd();

//     const getUser = async () => {
//       console.group("getUser running in UserProvider...");
//       try {
//         // Await the interceptors readiness promise before making the request
//         console.log("getUser: Awaiting interceptorsReadyPromise...");
//         await interceptorsReadyPromise;
//         console.log(
//           "getUser: interceptorsReadyPromise resolved. Proceeding with user fetch."
//         );

//         console.log(
//           `[UserProvider] Attempting to fetch user with accessToken: ${accessToken ? "PRESENT" : "ABSENT"}, isAuthenticated: ${isAuthenticated}`
//         );
//         console.log(
//           "Requesting /auth/user with axiosPrivate instance ID (from AuthContext):",
//           (axiosPrivate as any).__instanceId
//         );

//         // --- DIAGNOSTIC LOG ---
//         console.log("--- DEBUGGING INTERCEPTORS STATE ---");
//         console.log(
//           "axiosPrivate.interceptors.request.handlers.length:",
//           (axiosPrivate.interceptors.request as any).handlers?.length || 0
//         );
//         console.log(
//           "axiosPrivate.interceptors.response.handlers.length:",
//           (axiosPrivate.interceptors.response as any).handlers?.length || 0
//         );
//         console.log("--- END DEBUGGING INTERCEPTORS STATE ---");

//         const response = await axiosPrivate.get<AuthUserResponse>("/auth/user"); // Use the context-provided axiosPrivate
//         setUser(response.data.user);
//         console.log("[UserProvider] User data response:", response);
//       } catch (err) {
//         setUser(null);
//         console.error("[UserProvider] Error fetching user data:", err);
//       } finally {
//         setIsUserDataLoading(false);
//       }
//       console.groupEnd();
//     };

//     // Only fetch user data if accessToken and isAuthenticated are true.
//     // The interceptorsReadyPromise will handle the timing.
//     if (accessToken && isAuthenticated) {
//       console.log(
//         "UserProvider: accessToken and isAuthenticated are true. Fetching user data."
//       );
//       getUser();
//     } else {
//       console.log(
//         "UserProvider: Conditions not met (accessToken or isAuthenticated). Not fetching user data."
//       );
//       setIsUserDataLoading(false);
//       setUser(null);
//     }
//   }, [accessToken, isAuthenticated, axiosPrivate, interceptorsReadyPromise]); // Added interceptorsReadyPromise to dependencies

//   const useUserValue = useMemo<UserContextType>(() => {
//     console.group("useUserValue useMemo running...");
//     console.log("User in useUserValue:", user);
//     console.groupEnd();
//     if (isAuthenticated) {
//       return {
//         status: "authenticated",
//         user,
//         addPost,
//         updatePost,
//         removePost,
//         isUserDataLoading,
//       };
//     }

//     return {
//       status: "unauthenticated",
//       user: null,
//       addPost: () => {},
//       updatePost: () => {},
//       removePost: () => {},
//       isUserDataLoading,
//     };
//   }, [
//     user,
//     isAuthenticated,
//     isUserDataLoading,
//     addPost,
//     updatePost,
//     removePost,
//   ]);

//   return (
//     <UserContext.Provider value={useUserValue}>{children}</UserContext.Provider>
//   );
// };

// const useUserData = () => {
//   return useContext(UserContext);
// };

// export { UserProvider as default, useUserData };
