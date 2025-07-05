import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    console.group("/dashboard beforeLoad running...");
    if (!context.auth?.isAuthenticated) {
      console.log(
        "context.auth?.isAuthenticated:",
        context.auth?.isAuthenticated
      );
      console.groupEnd();
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
