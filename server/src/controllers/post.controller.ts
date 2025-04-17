import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";

import { createPost, createComment, getPost, getPosts } from "../services/blog";

interface PostController {
  createPost: RequestHandler;
  createPostComment: RequestHandler;
  getPost: RequestHandler;
  getPosts: RequestHandler;
  getPostComment: RequestHandler;
  getPostComments: RequestHandler;
  deletePost: RequestHandler;
  deletePostComment: RequestHandler;
}

const postController: PostController = {
  createPost: asyncHandler(async (req, res) => {
    // For now the req.body values are strings
    // createPost needs blogId and authorId
    // blogId and authorId should be accessible from
    const newPost = await createPost(req.body);
    res.json(newPost);
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
  deletePost: asyncHandler(async (req, res) => {}),
  deletePostComment: asyncHandler(async (req, res) => {}),
};

export default postController;
