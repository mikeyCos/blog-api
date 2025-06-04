import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";
import { escape } from "querystring";

const postSchema = {
  title: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Title cannot be empty.",
    escape: true,
  },
  content: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Post body cannot be empty.",
    escape: true,
  },
};

const validatePost = (): RequestHandler => {
  const postValidator: RequestHandler = asyncHandler(
    async (req, res, next): Promise<any> => {
      console.log("req.body:", req.body);
      await checkSchema(postSchema, ["body"]).run(req);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // TODO
        // Send errors to client
        // May need to map errors; errors.mapped()
        console.log("errors.mapped():", errors.mapped());
        next({ status: "fail", code: 422, errors: errors.mapped() });
      }

      next();
    }
  );

  return postValidator;
};

export default validatePost;
