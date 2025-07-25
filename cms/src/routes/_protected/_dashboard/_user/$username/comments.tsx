import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/_user/$username/comments")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/$username/comments"!</div>;
}
