import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");

interface blogController {
  getBlog: RequestHandler<BlogId>;
}

interface BlogId {
  id: string;
}

const blogController = {
  getBlog: asyncHandler(async (req, res) => {}),
};

export default blogController;
