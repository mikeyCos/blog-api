import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoutes = () => {
  const userRouter = Router();
  const { getUser } = userController;

  // GET requests
  userRouter.get("/:id", getUser);

  // POST requests
  // PUT requests
  // DELETE requests
  return userRouter;
};
export default userRoutes;
