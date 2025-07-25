import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    console.group("[_protected] beforeLoad running...");
    console.log("context:", context);
    console.groupEnd();

    //   if (!context.auth.isAuthenticated) {
    //     console.log(
    //       "context.auth.isAuthenticated:",
    //       context.auth.isAuthenticated
    //     );
    //     console.groupEnd();
    //     throw redirect({
    //       to: "/login",
    //       search: {
    //         redirect: location.href,
    //       },
    //     });
    //   }

    //   // const result = false;
    //   const result = await context.auth.authorize();
    //   console.log("result:", result);
    //   console.groupEnd();
  },
  loader: ({ context }) => {
    console.group("[_protected] loader running...");
    console.log("context:", context);
    console.groupEnd();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
