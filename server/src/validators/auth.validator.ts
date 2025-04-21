import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";

const authSchema = {
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

const validateAuth = (): RequestHandler => {
  const authValidator: RequestHandler = asyncHandler(async (req, res, next) => {
    await checkSchema(authSchema, ["body"]).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next({ status: 401, message: "Unauthorized" });
    }

    next();
  });

  return authValidator;
};

export default validateAuth;
