import { createFileRoute, useRouteContext } from "@tanstack/react-router";

import Posts from "../../../../../features/posts/Posts";
import { UserPostsSuccessResponse } from "../../../../../interfaces/responses";
import { Route as RootRoute } from "../../../../__root";

export const Route = createFileRoute(
  "/_protected/_dashboard/_user/$username/posts"
)({
  loader: async ({ context, params, parentMatchPromise }) => {
    console.group("[/posts] loader running...");
    console.log("context:", context);
    console.log("params:", params);
    console.groupEnd();
    const parentDataFoo = await parentMatchPromise;
    console.log("parentDataFoo:", parentDataFoo);

    if (context.auth.isAuthenticated) {
      if (params.username === context.user.user?.username) {
        return context.user.user.blog?.posts ?? [];
      } else {
        try {
          const response =
            await context.axiosPrivate.get<UserPostsSuccessResponse>(
              `/users/${params.username}/posts`
            );
          console.log(
            `[response] for /users/${params.username}/posts:`,
            response
          );
          return response.data.posts;
        } catch (err) {}
      }
    }
  },
  component: Posts,
});
