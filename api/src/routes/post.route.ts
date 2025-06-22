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
    getAllPosts,
    getPostComment,
    getPostComments,
    editPost,
    deletePost,
    deletePostComment,
  } = postController;

  // GET requests
  postRouter.get("/", getAllPosts);
  postRouter.get("/:postTitle", getPost);
  postRouter.get("/:postTitle/comments/:commentId", getPostComment);
  postRouter.get("/:postTitle/comments", getPostComments);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/post -d '{"title":"Post Title", "content":"Lorem ipsum scelerisque risus fringilla justo."}'
  // blogId and authorId are required
  postRouter.post("/create", authenticateToken, validatePost(), createPost);
  postRouter.post(
    "/:postTitle/comments/create",
    authenticateToken,
    createPostComment
  );

  // PUT requests
  postRouter.put(
    "/:postTitle/edit",
    authenticateToken,
    validatePost(),
    editPost
  );

  // DELETE requests
  postRouter.delete("/:postTitle/delete", authenticateToken, deletePost);
  postRouter.delete(
    "/:postTitle/comments/:commentId/delete",
    authenticateToken,
    deletePostComment
  );

  return postRouter;
};
export default postRoutes;
