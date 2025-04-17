import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");

interface PostController {
  createPost: RequestHandler;
  createPostComment: RequestHandler;
  getPost: RequestHandler<PostId>;
  getPosts: RequestHandler;
  getPostComment: RequestHandler;
  getPostComments: RequestHandler;
  deletePost: RequestHandler<PostId>;
  deletePostComment: RequestHandler;
}

interface PostId {
  id: string;
}

const postController: PostController = {
  createPost: asyncHandler(async (req, res) => {}),
  createPostComment: asyncHandler(async (req, res) => {}),
  getPost: asyncHandler(async (req, res) => {}),
  getPosts: asyncHandler(async (req, res) => {}),
  getPostComment: asyncHandler(async (req, res) => {}),
  getPostComments: asyncHandler(async (req, res) => {}),
  deletePost: asyncHandler(async (req, res) => {}),
  deletePostComment: asyncHandler(async (req, res) => {}),
};

export default postController;
