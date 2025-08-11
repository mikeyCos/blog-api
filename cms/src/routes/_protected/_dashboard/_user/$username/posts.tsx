import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import Posts from "../../../../../features/posts/Posts";

export const Route = createFileRoute(
  "/_protected/_dashboard/_user/$username/posts"
)({
  loader: async ({ context, params }) => {
    console.group("[/posts] loader running...");
    console.log("context:", context);
    console.log("params:", params);
    console.groupEnd();

    if (context.auth.isAuthenticated) {
      try {
        // What if the username parameter is the same as the authenticated user?
        const response = await context.axiosPrivate.get(
          `/users/${params.username}/posts`
        );
        console.log(
          `[response] for /users/${params.username}/posts:`,
          response
        );
      } catch (err) {}
    }
  },
  component: Posts,
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
