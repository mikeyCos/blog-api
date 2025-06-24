import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";

import { getUser } from "../services/user";
import {
  createPost,
  createComment,
  getPost,
  getPosts,
  updatePost,
} from "../services/blog";
import { User } from "../interfaces/user";
import slugify from "../utils/slugify.utils";
import { ValidDataPostSchema } from "../validators/params.validator";

interface PostController {
  createPost: RequestHandler;
  createPostComment: RequestHandler;
  getPost: RequestHandler;
  getAllPosts: RequestHandler;
  getPostComment: RequestHandler;
  getPostComments: RequestHandler;
  editPost: RequestHandler;
  deletePost: RequestHandler;
  deletePostComment: RequestHandler;
}

const postController: PostController = {
  createPost: asyncHandler(async (req, res, next) => {
    // For now the req.body values are strings
    // createPost needs blogId and authorId
    // blogId and authorId should be accessible from
    console.log("createPost running...");
    const { title, content } = matchedData(req, {
      onlyValidData: true,
    });

    console.log("title:", title);
    console.log("content:", content);
    console.log("res.user:", req.user);

    // User has been authenticated before reaching this endpoint
    const { id: userId } = req.user;
    const user = await getUser(userId);
    const titleSlug = slugify(title);

    const newPost = await createPost({
      blogId: user!.blog!.id,
      authorId: userId,
      title,
      titleSlug,
      content,
    });

    res.json({
      status: "success",
      code: 200,
      post: newPost,
    });
  }),
  createPostComment: asyncHandler(async (req, res) => {
    // const newPostComment = await createComment({...req.body, });
    // console.log("createPostComment");
    // res.json(newPostComment);
  }),
  getPost: asyncHandler(async (req, res) => {
    console.group("getPost endpoint running...");
    const { username, postPublicId, postSlugTitle } =
      matchedData<ValidDataPostSchema>(req, { onlyValidData: true });
    const post = await getPost(postPublicId, username);
    res.json(post);
    console.groupEnd();
  }),
  getAllPosts: asyncHandler(async (req, res) => {
    console.group("getPosts endpoint running...");
    console.groupEnd();
    // TODO
    // Require query parameters of author?
    const { blogId } = req.params;
    const posts = await getPosts(blogId);
    res.json(posts);
  }),
  getPostComment: asyncHandler(async (req, res) => {}),
  getPostComments: asyncHandler(async (req, res) => {}),
  editPost: asyncHandler(async (req, res) => {
    const { title, content } = matchedData(req, {
      onlyValidData: true,
    });
    console.group("editPost running...");
    const { postPublicId, username } = req.params;
    const titleSlug = slugify(title);
    // Will need postId, titleSlug from req.params
    const updatedPost = await updatePost({
      username,
      postPublicId,
      title,
      titleSlug,
      content,
    });

    res.json({ status: "success", code: 200, post: updatedPost });
  }),
  deletePost: asyncHandler(async (req, res) => {}),
  deletePostComment: asyncHandler(async (req, res) => {}),
};

export default postController;
