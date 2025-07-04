import { createRootRoute } from "@tanstack/react-router";
import App from "../app/App";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <p>hello world</p>
    </>
  ),
});

export default rootRoute;
