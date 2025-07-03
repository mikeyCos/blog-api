import React, { useEffect } from "react";
import {
  Outlet,
  useAsyncError,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { useAuth } from "../hooks/useAuth";
// import { usePrevLocation } from "../hooks/usePrevLocation";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useUserData } from "../hooks/useUser";
import useError from "../hooks/useError";

const ProtectedLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("ProtectedLayout running");
  const { username } = useParams<{ username: string }>();
  const { accessToken, isAuthenticated, setAccessToken } = useAuth();
  const { user, isUserDataLoading } = useUserData();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const throwError = useError();
  // console.log(prevLocation);
  // if (!accessToken)
  //   return <Navigate to="/login" state={{ from: location }} replace />;

  const navigate = useNavigate();
  useEffect(() => {
    console.group("ProtectedLayout mounted...");

    const authorize = async () => {
      try {
        console.log("username:", username);
        console.log("isAuthenticated:", isAuthenticated);
        console.log("isUserDataLoading:", isUserDataLoading);
        console.log("user:", user);

        // if username parameter is equal to authenticated user continue
        // if username parameter is not equal to authenticated user
        //  check if authenticate user is an admin
        // What if username is an invalid user?

        if (username && user && username !== user.username) {
          const isAdmin = user.roles.some((role) => {
            return role.roleDetails.name === "ADMIN";
          });

          if (!isAdmin) {
            console.log("user is not an administrator");
            console.groupEnd();
            throw new Error(
              "You do not have permission(s) to view this content"
            );
          }
        }

        await axiosPrivate.get("/auth");
      } catch (err) {
        console.log("authorize err caught");
        console.log("location:", location);
        console.log(err);
        console.log("accessToken:", accessToken);
        console.groupEnd();
        if (err instanceof Error && isAuthenticated) {
          console.log(err);
          console.log("err instanceof Error:", err instanceof Error);
          console.groupEnd();
          // How to throw error to React Router errorElement?
          // throw err;
          throwError(err);
        } else {
          // What if an authenticated user is deleted and a /auth request is sent?
          // Should the user be notified?
          setAccessToken(null);
          navigate("/login", { state: { prevLocation: location.pathname } });
        }
      }
    };

    authorize();
  }, [location, isUserDataLoading]);

  return <>{children ?? <Outlet />}</>;
};

export default ProtectedLayout;
