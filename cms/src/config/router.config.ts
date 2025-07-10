import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: { auth: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
