import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

import App from "../app/App"; // Testing...

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  Wrap: App,
  context: { auth: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
