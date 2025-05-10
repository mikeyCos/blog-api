import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateParams } from "../validators/validators";
import { userSchema } from "../validators/params.validator";

const userRoutes = () => {
  const userRouter = Router();
  const { getUser, getUsers, deleteUser } = userController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3001/user/:userId
  userRouter.get("/:userId", validateParams(userSchema), getUser);
  userRouter.get("/", getUsers);

  // PUT requests

  // DELETE requests
  userRouter.delete("/:userId", validateParams(userSchema), deleteUser);
  return userRouter;
};
export default userRoutes;
