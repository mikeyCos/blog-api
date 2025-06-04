import { Router } from "express";

import postController from "../controllers/post.controller";
import { validatePost } from "../validators/validators";
import authenticateToken from "../middleware/authenticateToken";

const postRoutes = () => {
  const postRouter = Router();
  const {
    createPost,
    createPostComment,
    getPost,
    getPosts,
    getPostComment,
    getPostComments,
    editPost,
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
  // blogId and authorId are required
  postRouter.post("/", authenticateToken, validatePost(), createPost); // Needs to be protected
  postRouter.post("/:postId/comment", authenticateToken, createPostComment);

  // PUT requests
  postRouter.put("/", authenticateToken, editPost);

  // DELETE requests
  postRouter.delete("/:postId", authenticateToken, deletePost); // Needs to be protected
  postRouter.delete(
    "/:postId/comments/:commentId",
    authenticateToken,
    deletePostComment
  ); // Needs to be protected(?)

  return postRouter;
};
export default postRoutes;
