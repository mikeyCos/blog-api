import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { useUserData } from "../hooks/useUser";
import { RoleName } from "../interfaces/user";

interface RoleProtectedRouteProps {
  allowedRoles: RoleName[];
  children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { username } = useParams<{ username: string }>();
  const { user, isUserDataLoading } = useUserData();
  const location = useLocation();

  // if params.username does not match their authenticated user's username
  //  check authenticated user's roles
  //  allowed roles: ADMIN, OWNER
  // if username parameter is equal to authenticated user continue
  // if username parameter is not equal to authenticated user
  //  check if authenticate user is an admin
  // What if username is an invalid user?

  useEffect(() => {
    console.group("RoleProtectedLayout mounted...");
    console.log("username:", username);
    console.log("isUserDataLoading:", isUserDataLoading);
    console.log("user:", user);
    console.groupEnd();
    /* if (username && user && username !== user.username) {
      const isAdmin = user.roles.some((role) => {
        return role.roleDetails.name === "ADMIN";
      });

      if (!isAdmin) {
        console.log("user is not an administrator");
        console.groupEnd();
        throw new Error("You do not have permission(s) to view this content");
      }
    } */
  }, []);

  return <>{children}</>;
};

export default RoleProtectedRoute;
