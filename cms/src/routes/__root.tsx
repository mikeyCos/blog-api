import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    console.group("[_root] beforeLoad running...");
    console.log("context:", context);
    console.groupEnd();
    try {
      await context.auth.initAuth();
    } catch (err) {
      console.group("[_root] err caught:");
      console.log("err:", err);
      console.groupEnd();
    }
  },
  component: RootLayout,
});
