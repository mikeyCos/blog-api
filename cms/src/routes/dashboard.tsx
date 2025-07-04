import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  // beforeLoad: ({ context, location }) => {
  //   if (!context.auth.isAuthenticated) {
  //     throw redirect({
  //       to: "/",
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
