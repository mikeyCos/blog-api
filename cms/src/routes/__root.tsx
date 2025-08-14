import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";
import { UserContextType } from "../hooks/useUser";
import router from "../config/router.config";

interface RouterContext {
  auth: AuthContext;
  axiosPrivate: AxiosPrivateContext;
  user: UserContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async ({ context }) => {
    console.group("[createRootRouteWithContext] loader running...");
    console.log("context:", context);
    console.groupEnd();

    if (context.auth.isLoading) {
      try {
        console.log("context.auth.isLoading:", context.auth.isLoading);
        await context.auth.initAuth();
      } catch (err) {
        console.log("context.auth.initAuth() err:", err);
      }
      return null;
    }

    if (context.auth.isAuthenticated && context.user.isLoading) {
      try {
        console.log(
          "context.auth.isAuthenticated && context.user.isLoading:",
          context.auth.isAuthenticated && context.user.isLoading
        );
        await context.user.getUser();
      } catch (err) {
        console.log("context.auth.initAuth() err:", err);
      }
    }
  },
  component: RootLayout,
});
