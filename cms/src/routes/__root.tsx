import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";

interface RouterContext {
  auth: AuthContext;
  axiosPrivate: AxiosPrivateContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
