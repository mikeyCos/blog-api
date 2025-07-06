import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
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

    try {
      context.auth.authorize();
    } catch (err) {
      console.error(err);
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
