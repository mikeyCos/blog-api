import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    console.group("[_protected] beforeLoad running...");
    console.log("context:", context);
    console.groupEnd();

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
    }

    //   // const result = false;
    //   const result = await context.auth.authorize();
    //   console.log("result:", result);
    //   console.groupEnd();
  },
  loader: async ({ context }) => {
    console.group("[_protected] loader running...");
    console.log("context:", context);
    console.groupEnd();

    const result = await context.auth.authorize();
    console.log("result:", result);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
