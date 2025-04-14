import express, { Application } from "express";
import pizzaRoutes from "./pizzas";

// Import routes and mount routes on specific paths
const routes = (app: Application) => {
  app.use("/pizza", pizzaRoutes());
};

export default routes;
