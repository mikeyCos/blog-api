import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosPrivateContext } from "../hooks/useAxiosPrivate";
import { UserContextType } from "../hooks/useUser";

interface RouterContext {
  auth: AuthContext;
  axiosPrivate: AxiosPrivateContext;
  user: UserContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
