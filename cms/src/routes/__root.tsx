import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import router from "../config/router.config";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    console.group("[_root] beforeLoad running...");
    console.log("context:", context);
    console.groupEnd();
    // router.invalidate();
    // Run initialize authentication when accessToken does not exist
    try {
      console.log("[_root] beforeLoad right before context.auth.initAuth()");
      if (!context.auth.isAuthenticated) {
        // await context.auth.initAuth();
        // router.invalidate();
      }
      console.group("[_root] beforeLoad after context.auth.initAuth()");
      console.log("context:", context);
      console.groupEnd();
    } catch (err) {
      console.group("[_root] err caught:");
      console.log("err:", err);
      console.groupEnd();
    }
  },
  component: RootLayout,
});
