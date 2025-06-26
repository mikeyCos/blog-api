import { Router } from "express";

import postController from "../controllers/post.controller";
import { validateParams, validatePost } from "../validators/validators";
import authenticateToken from "../middleware/authenticateToken";
import { postSchema } from "../validators/params.validator";

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
  postRouter.get(
    "/:postPublicId/:postSlugTitle",
    validateParams(postSchema),
    getPost
  );
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
    validateParams(postSchema),
    validatePost(),
    authenticateToken,
    createPostComment
  );

  // PUT requests
  postRouter.put(
    "/:postPublicId",
    authenticateToken,
    validateParams(postSchema),
    validatePost(),
    editPost
  );

  // DELETE requests
  // How can I use this only for routes /posts, not /users/*/posts?
  postRouter.delete(
    "/:postId/",
    authenticateToken,
    validateParams(postSchema),
    deletePost
  );
  postRouter.delete(
    "/:postPublicId/:postSlugTitle/comments/:commentId",
    authenticateToken,
    validateParams(postSchema),
    deletePostComment
  );

  return postRouter;
};
export default postRoutes;
