import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";

import { getUser } from "../services/user";
import { createPost, createComment, getPost, getPosts } from "../services/blog";
import { User } from "../interfaces/user";

interface PostController {
  createPost: RequestHandler;
  createPostComment: RequestHandler;
  getPost: RequestHandler;
  getPosts: RequestHandler;
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

    console.log("user:", user);

    // TODO
    // Slugify title
    const titleSlug = title;

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
    const { postId } = req.params;
    const post = await getPost(postId);
    res.json(post);
  }),
  getPosts: asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const posts = await getPosts(blogId);
    res.json(posts);
  }),
  getPostComment: asyncHandler(async (req, res) => {}),
  getPostComments: asyncHandler(async (req, res) => {}),
  editPost: asyncHandler(async (req, res) => {}),
  deletePost: asyncHandler(async (req, res) => {}),
  deletePostComment: asyncHandler(async (req, res) => {}),
};

export default postController;
