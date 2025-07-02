import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateParams } from "../validators/validators";
import { postSchema, userSchema } from "../validators/params.validator";
import postRoutes from "./post.route";

const userRoutes = () => {
  const userRouter = Router();
  const { getUser, getUsers, deleteUser } = userController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3001/user/:userId
  userRouter.get("/", getUsers);
  userRouter.get("/:username", validateParams(userSchema), getUser);

  // PUT requests

  // DELETE requests
  userRouter.delete("/:username", validateParams(userSchema), deleteUser);

  // Nested routes
  userRouter.use("/:username/posts", validateParams(postSchema), postRoutes());

  return userRouter;
};

export default userRoutes;
