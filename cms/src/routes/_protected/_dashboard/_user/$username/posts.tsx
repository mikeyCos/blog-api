import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_user/$username/posts"
)({
  loader: async ({ context, params }) => {
    console.group("[/posts] loader running...");
    console.log("context:", context);
    console.log("params:", params);
    console.groupEnd();
    const response = await context.axiosPrivate.get(`/users`);
    console.log("response:", response);
  },
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
