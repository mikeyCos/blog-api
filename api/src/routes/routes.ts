import { Application } from "express";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";
import authRoutes from "./auth.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  const baseURL = "/api/";
  app.use("/pizza", pizzaRoutes());
  app.use(`${baseURL}/users`, userRoutes());
  app.use(`${baseURL}/auth`, authRoutes());
};

export default routes;

/* Base route
 * api/
 *
 * Public routes
 * public/
 *    users/:username
 *        /posts
 *        /posts/:postId
 *        /posts/:postId/comments
 *
 * Private routes
 * private/
 *    auth/
 *    users/:userId
 *        /posts
 *        /posts/postId
 *        /posts/postId/update
 *        /posts/postId/delete
 *    posts/postId/comments/commentId
 *    posts/postId/comments/commentId/delete
 */
