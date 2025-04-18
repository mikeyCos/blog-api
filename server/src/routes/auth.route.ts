import { Router } from "express";

const authRoutes = () => {
  const authRouter = Router();

  // GET requests

  // POST requests
  // curl -w "\n" -X POST http://localhost:3001/pizza/
  // authRouter.post("/login", getPizzas);

  // curl -w "\n" -X POST http://localhost:3001/pizza/:id
  // authRouter.post("/logout", getPizza);

  // PUT requests
  // DELETE requests
  return authRouter;
};

export default authRoutes;
