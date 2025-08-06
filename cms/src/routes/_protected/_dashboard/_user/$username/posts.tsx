import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_user/$username/posts"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const context = useRouteContext({
    from: "/_protected",
  });
  console.group("[Posts] component rendering...");
  console.log("context:", context);
  console.groupEnd();
  return <div>Hello "/_protected/$username/posts"!</div>;
}
