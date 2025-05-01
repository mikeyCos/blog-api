import express, { Application } from "express";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";
import postRoutes from "./post.route";
import authRoutes from "./auth.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
  app.use("/user", userRoutes());
  app.use("/post", postRoutes());
  app.use("/auth", authRoutes());
};

export default routes;
