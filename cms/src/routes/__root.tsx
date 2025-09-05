import {
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";
import { UserContextType } from "../hooks/useUser";
import queryClient from "../config/query.config";
import { getAuthenticatedUser } from "../entities/user/api/queries";

interface RouterContext {
  auth: AuthContext;
  axiosPrivate: AxiosPrivateContext;
  user: UserContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  // export const Route = createRootRoute({
  // loader: async ({ context }) => {
  loader: async ({ context }) => {
    // const userQueryState = queryClient.getQueryState(["user"]);
    console.group("[__root] loader running...");
    // console.log("context:", context);
    // console.log("userQueryState:", userQueryState);
    console.groupEnd();

    // // If context.auth.isLoading is false
    // //  Return the cached data for query key ["user"]

    // // Try
    // //  Performing initial authentication
    // //  Fetch and return user
    // // Catch
    // //  Return null user
    // if (!context.auth.isLoading) {
    //   const user = userQueryState?.data;
    //   console.log(user);
    //   return { user: null };
    // }

    // try {
    //   await context.auth.initAuth();
    //   const user = await queryClient.ensureQueryData({
    //     queryKey: ["user"],
    //     queryFn: () => getAuthenticatedUser(context.axiosPrivate),
    //   });
    //   console.log("user:", user);
    //   return { user };
    // } catch (err) {
    //   console.log("context.auth.initAuth() err:", err);
    //   return { user: null };
    // }
  },
  component: RootLayout,
});
