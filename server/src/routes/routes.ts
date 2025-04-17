import express, { Application } from "express";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";
import postRoutes from "./post.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
  app.use("/user", userRoutes());
  app.use("/post", postRoutes());
};

export default routes;
