import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { AuthContext } from "../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import { AxiosInstance } from "axios";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
