import { createRoute } from "@tanstack/react-router";
import rootRoute from "./__root";
import Home from "../pages/home/Home";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export default homeRoute;
