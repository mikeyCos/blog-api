import express, { Application } from "express";
import blogRoutes from "./blog.route";
import userRoutes from "./user.route";
import pizzaRoutes from "./pizza.route";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
  app.use("/blog", blogRoutes());
  app.use("/user", userRoutes());
};

export default routes;
