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
    deletePostComment,
  } = postController;

  // GET requests
  postRouter.get("/:postId", getPost);
  postRouter.get("/:blogId", getPosts);
  postRouter.get("/:postId/comments/:commentId", getPostComment);
  postRouter.get("/:postId/comments", getPostComments);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/post -d '{"title":"Post Title", "content":"Lorem ipsum scelerisque risus fringilla justo."}'
  postRouter.post("/", createPost); // Needs to be protected
  postRouter.post("/:postId/comment", createPostComment);
  // PUT requests

  // DELETE requests
  postRouter.delete("/:postId", deletePost); // Needs to be protected
  postRouter.delete("/:postId/comments/:commentId", deletePostComment); // Needs to be protected(?)

  return postRouter;
};
export default postRoutes;
