import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/_user")({
  loader: async ({ params }) => {
    console.log("[/_user] loader running...");
    console.log("params:", params);
  },
  component: RouteComponent,
});

function RouteComponent() {
  console.log("[/_user] component rendering...");
  return <Outlet />;
}
