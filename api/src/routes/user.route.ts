import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateParams } from "../validators/validators";
import { postSchema, userSchema } from "../validators/params.validator";
import postRoutes from "./post.route";
import authenticateToken from "../middleware/authenticateToken";

const userRoutes = () => {
  const userRouter = Router();
  const { getUser, getUsers, deleteUser } = userController;

  // GET requests
  // curl -w "\n" -X GET http://localhost:3001/user/:userId
  userRouter.get("/", authenticateToken, getUsers);
  userRouter.get("/:username", validateParams(userSchema), getUser);

  // PUT requests
  // userRouter.put('/:username', authenticateToken, validateParams(userSchema), updateUser)

  // DELETE requests
  userRouter.delete(
    "/:username",
    authenticateToken,
    validateParams(userSchema),
    deleteUser
  );

  // Nested routes
  userRouter.use(
    "/:username/posts",
    validateParams(userSchema),
    validateParams(postSchema),
    postRoutes()
  );

  return userRouter;
};

export default userRoutes;
