import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";
import { UserContextType } from "../hooks/useUser";

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
        // TODO will need to TanStack query here
        // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
        // const user = await context.user.getUser();
        // return { user };
      } catch (err) {
        console.log("context.auth.initAuth() err:", err);
        return null;
      }
    }
  },
  component: RootLayout,
});
