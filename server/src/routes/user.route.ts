import { Router } from "express";
import userController from "../controllers/user.controller";
import validateParams, { userSchema } from "../validators/params.validator";

const userRoutes = () => {
  const userRouter = Router();
  const { createUser, getUser, getUsers, deleteUser } = userController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3001/user/:userId
  userRouter.get("/:userId", validateParams(userSchema), getUser);
  userRouter.get("/", getUsers);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/user -d '{"username":"squinton", "password":"passWord123"}'
  userRouter.post("/", createUser);

  // PUT requests

  // DELETE requests
  userRouter.delete("/:userId", validateParams(userSchema), deleteUser);
  return userRouter;
};
export default userRoutes;
