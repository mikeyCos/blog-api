import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";

const isIdValid = async (id: string) => {
  const userExists = !!(await getUser(id));

  if (!userExists)
    return Promise.reject(`User with the id, ${id}, does not exist`);
};

const userSchema = {
  userId: {
    trim: true,
    custom: {
      options: isIdValid,
    },
    escape: true,
  },
};

const validateParams = (schema: Schema): RequestHandler => {
  const paramsValidator: RequestHandler = asyncHandler(
    async (req, res, next) => {
      await checkSchema(schema, ["params"]).run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next({ status: 404, message: "Resource not found" });
      }

      next();
    }
  );

  return paramsValidator;
};

export { validateParams as default, userSchema };
