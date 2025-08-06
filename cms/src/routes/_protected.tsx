import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import ProtectedLayout from "../layouts/ProtectedLayout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    console.group("[_protected] beforeLoad running...");
    console.log("context:", context);
    console.groupEnd();

    // Check if user is authenticated
    // Otherwise, check if user is still authenticated
    if (!context.auth.isAuthenticated) {
      console.log("context.auth.isLoading:", context.auth.isLoading);
      console.log(
        "context.auth.isAuthenticated:",
        context.auth.isAuthenticated
      );
      console.log("location:", location);
      console.groupEnd();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    } else {
      // Special case, what if refresh token expires
      // And the most recent access token expires
      try {
        await context.auth.authorize();
      } catch (err) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },
  loader: async ({ context }) => {
    console.group("[_protected] loader running...");
    console.log("context:", context);
    console.groupEnd();

    // const result = await context.auth.authorize();
    // console.log("result:", result);
  },
  component: ProtectedLayout,
});

// 2DLP-QVMG-EE2A-2888.
