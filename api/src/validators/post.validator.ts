import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";

const postSchema = {
  username: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Username cannot be empty.",
    escape: true,
  },
  password: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Password cannot be empty.",
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
        next({ status: "fail", code: 401, data: errors.mapped() });
      }

      next();
    }
  );

  return postValidator;
};

export default validatePost;
