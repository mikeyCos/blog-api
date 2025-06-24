import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateParams } from "../validators/validators";
import { userSchema } from "../validators/params.validator";
import postRoutes from "./post.route";

const userRoutes = () => {
  const userRouter = Router();
  const { getUser, getUsers, deleteUser } = userController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3001/user/:userId
  userRouter.get("/", getUsers);
  userRouter.get("/:userId", validateParams(userSchema), getUser);

  // PUT requests

  // DELETE requests
  userRouter.delete("/:userId", validateParams(userSchema), deleteUser);

  // Nested routes
  userRouter.use("/:username/posts", postRoutes());

  return userRouter;
};

export default userRoutes;
