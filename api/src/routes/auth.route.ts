import { Router } from "express";
import authController from "../controllers/auth.controller";
import authenticateToken from "../middleware/authenticateToken";
import validateParams, { roleSchema } from "../validators/params.validator";
import authenticateRole from "../middleware/authenticateRoles";

const authRoutes = () => {
  const {
    authorize,
    getAuthenticatedUser,
    refreshToken,
    login,
    logout,
    signup,
  } = authController;
  const authRouter = Router();

  // GET requests
  authRouter.get("/", authenticateToken, authorize);
  authRouter.get("/user", authenticateToken, getAuthenticatedUser);
  authRouter.get("/user/:username", authenticateToken, getAuthenticatedUser);

  // POST requests
  // curl -w "\n" -X POST http://localhost:3001/api/auth
  authRouter.post("/login", login);
  authRouter.post("/logout", logout);
  authRouter.post("/refresh", refreshToken);
  authRouter.post("/signup", signup);

  // curl -w "\n" -X POST http://localhost:3001/pizza/:id
  // authRouter.post("/logout", getPizza);

  // PUT requests
  // DELETE requests
  return authRouter;
};

export default authRoutes;
