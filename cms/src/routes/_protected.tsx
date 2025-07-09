import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    console.group("/dashboard beforeLoad running...");
    if (!context.auth.isAuthenticated) {
      console.log(
        "context.auth.isAuthenticated:",
        context.auth.isAuthenticated
      );
      console.groupEnd();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // const result = false;
    // const result = await context.auth.authorize();
    // console.log("result:", result);
    console.groupEnd();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
