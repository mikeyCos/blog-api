import { Router } from "express";
import authController from "../controllers/auth.controller";
import authenticateToken from "../middleware/authenticateToken";
import { initSchema } from "../validators/query.validator";
import { validateQuery } from "../validators/validators";

const authRoutes = () => {
  const { authorize, refreshAccessToken, login, logout, signup } =
    authController;
  const authRouter = Router();

  // GET requests
  authRouter.get("/", authenticateToken, authorize);

  // POST requests
  // curl -w "\n" -X POST http://localhost:3001/auth
  authRouter.post("/login", login);
  authRouter.post("/logout", logout);
  authRouter.post("/refresh", refreshAccessToken);
  authRouter.post("/signup", signup);

  // curl -w "\n" -X POST http://localhost:3001/pizza/:id
  // authRouter.post("/logout", getPizza);

  // PUT requests
  // DELETE requests
  return authRouter;
};

export default authRoutes;
