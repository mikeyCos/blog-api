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
  postRouter.get("/:postPublicId/:postSlugTitle", getPost);
  postRouter.get(
    "/:postPublicId/:postSlugTitle/comments/:commentId",
    getPostComment
  );
  postRouter.get("/:postPublicId/:postSlugTitle/comments", getPostComments);

  // POST requests
  // curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3001/post -d '{"title":"Post Title", "content":"Lorem ipsum scelerisque risus fringilla justo."}'
  // blogId and authorId are required
  postRouter.post("/", authenticateToken, validatePost(), createPost);
  postRouter.post(
    "/:postPublicId/:postSlugTitle/comments",
    authenticateToken,
    createPostComment
  );

  // PUT requests
  postRouter.put("/:postPublicId", authenticateToken, validatePost(), editPost);

  // DELETE requests
  postRouter.delete("/:postPublicId/", authenticateToken, deletePost);
  postRouter.delete(
    "/:postPublicId/:postSlugTitle/comments/:commentId",
    authenticateToken,
    deletePostComment
  );

  return postRouter;
};
export default postRoutes;
