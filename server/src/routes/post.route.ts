import { Router } from "express";
import postController from "../controllers/post.controller";
import validateParams from "../validators/params.validator";

const postRoutes = () => {
  const postRouter = Router();
  const {
    createPost,
    createPostComment,
    getPost,
    getPosts,
    getPostComment,
    getPostComments,
    deletePost,
    deletePostComment
  } = postController;

  // GET requests
  postRouter.get("/:postId", getPost);
  postRouter.get("/:postId", getPosts);
  postRouter.get("/:postId/comments/:commentId", getPostComment);
  postRouter.get("/:postId/comments", getPostComments);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/user -d '{"username":"squinton", "password":"passWord123"}'
  postRouter.post("/:postId", createPost);
  postRouter.post("/:postId/comment", createPostComment);
  // PUT requests

  // DELETE requests
  postRouter.delete("/:postId", deletePost);
  postRouter.delete('/:postId/comments/:commentId' deletePostComment)

  return postRouter;
};
export default postRoutes;
