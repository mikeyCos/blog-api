import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";

import { createPost, createComment, getPost, getPosts } from "../services/blog";

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
  createPost: asyncHandler(async (req, res) => {
    // For now the req.body values are strings
    // createPost needs blogId and authorId
    // blogId and authorId should be accessible from
    console.log("createPost running...");
    console.log("res.user:", req.user);
    const { title, content } = req.body;
    const user = req.user;
    /* const newPost = await createPost({
      blogId: user.blog.id,
      authorId: user.id,
      title,
      content,
    });

    res.json({ newPost });*/
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
