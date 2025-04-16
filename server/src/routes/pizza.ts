import { Router } from "express";
import pizzaController from "../controllers/pizza.controller";

const pizzaRoutes = () => {
  const pizzaRouter = Router();
  const { getPizza, getPizzas } = pizzaController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3000/pizza/
  pizzaRouter.get("/", getPizzas);

  // curl -w "\n" -X GET http://localhost:3000/pizza/:id
  pizzaRouter.get("/:id", getPizza);

  // POST requests
  // PUT requests
  // DELETE requests
  return pizzaRouter;
};

export default pizzaRoutes;
