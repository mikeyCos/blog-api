import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");

interface BlogController {
  getBlog: RequestHandler<BlogId>;
}

interface BlogId {
  id: string;
}

const blogController: BlogController = {
  getBlog: asyncHandler(async (req, res) => {}),
};

export default blogController;
