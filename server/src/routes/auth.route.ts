import { Router } from "express";
import authController from "../controllers/auth.controller";
import authenticateToken from "../middleware/authenticateToken";

const authRoutes = () => {
  const { verify, login, signup } = authController;
  const authRouter = Router();

  // GET requests
  authRouter.get("/", authenticateToken, verify);

  // POST requests
  // curl -w "\n" -X POST http://localhost:3001/auth
  authRouter.post("/login", login);
  authRouter.post("/signup", signup);

  // curl -w "\n" -X POST http://localhost:3001/pizza/:id
  // authRouter.post("/logout", getPizza);

  // PUT requests
  // DELETE requests
  return authRouter;
};

export default authRoutes;
