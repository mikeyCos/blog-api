import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";
import { UserContextType } from "../hooks/useUser";

interface RouterContext {
  auth: AuthContext;
  axiosPrivate: AxiosPrivateContext;
  user: UserContextType;
  foo: string | null;
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
        const user = await context.user.getUser();
        return { parentLoaderData: { user } };
      } catch (err) {
        console.log("context.auth.initAuth() err:", err);
        return null;
      }
    }
  },
  component: RootLayout,
});
