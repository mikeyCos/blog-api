import { createRootRouteWithContext } from "@tanstack/react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import { AuthContext } from "../hooks/useAuth";

interface RouterContext {
  auth: AuthContext | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <DefaultLayout />
    </>
  ),
});
