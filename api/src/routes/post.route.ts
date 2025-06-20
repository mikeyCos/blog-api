import { Router } from "express";

import postController from "../controllers/post.controller";
import { validatePost } from "../validators/validators";
import authenticateToken from "../middleware/authenticateToken";

const postRoutes = () => {
  const postRouter = Router({ mergeParams: true });
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
  postRouter.get("/", getPosts);
  postRouter.get("/:postTitle", getPost); // Needs to be protected to authenticated user
  postRouter.get("/:author/:postTitle/comments/:commentId", getPostComment);
  postRouter.get("/:author/:postTitle/comments", getPostComments);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/post -d '{"title":"Post Title", "content":"Lorem ipsum scelerisque risus fringilla justo."}'
  // blogId and authorId are required
  postRouter.post("/new", authenticateToken, validatePost(), createPost);
  postRouter.post("/:postId/comment", authenticateToken, createPostComment);

  // PUT requests
  postRouter.put("/", authenticateToken, editPost);

  // DELETE requests
  postRouter.delete("/:postId", authenticateToken, deletePost);
  postRouter.delete(
    "/:postId/comments/:commentId",
    authenticateToken,
    deletePostComment
  );

  return postRouter;
};
export default postRoutes;
