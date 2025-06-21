import { Application } from "express";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";
import authRoutes from "./auth.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
  app.use("/users", userRoutes());
  app.use("/auth", authRoutes());
};

export default routes;

/* Base route
 * api/
 *
 * Public routes
 * public/
 *    users/:username
 *        posts/
 *            posts/postId
 *
 * Private routes
 * private/
 *    auth/
 *    users/
 *    posts/
 */
