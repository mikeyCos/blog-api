import { Application } from "express";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";
import authRoutes from "./auth.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  const baseURL = "/api";
  app.use("/pizza", pizzaRoutes());
  app.use(`${baseURL}/users`, userRoutes());
  app.use(`${baseURL}/auth`, authRoutes());
};

export default routes;

/* Base route
 * /api
 *
 * Public routes
 *
 * /public
 * GET   /users/:username
 * GET       /posts
 * GET       /posts/:postId
 * GET       /posts/:postId/comments
 *
 * Private routes
 * /private
 *    /auth
 *        /signup
 *        /login
 *        /logout
 *        /refreshToken                             returns new access token
 *        /user                                     gets authenticated user
 *    /users/:userId
 *        /posts                                    returns all posts by blog id
 *        /posts/create                             creates and returns new post
 *        /posts/postId                             gets specific post by post id
 *        /posts/postId/update                      updates and returns updated post by post id
 *        /posts/postId/delete                      deletes post by post id
 *        /posts/postId/comments                    returns all comments by post id
 *        /posts/postId/comments/commentId          returns comment by post id and comment id
 *        /posts/postId/comments/commentId/delete
 */
