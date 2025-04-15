import express, { Application } from "express";
import blogRoutes from "./blog";
import userRoutes from "./user";
import pizzaRoutes from "./pizzas";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
  app.use("/blog", blogRoutes());
  app.use("/user", userRoutes());
};

export default routes;
