import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";
import { BadRequestError, UserNotFoundError } from "../errors/customErrors";

const isIdValid = async (id: string) => {
  /* const userExists = !!(await getUser(id));
  if (!userExists)
    return Promise.reject(`User with the id, ${id}, does not exist`); */
  try {
    await getUser(id);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      console.log("UserNotFoundError");
      return Promise.reject(`User with the ID, ${id}, does not exist.`);
    }
    throw err;
  }
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
        // next({ status: "fail", code: 404, errors: errors.mapped() });
        throw new BadRequestError(
          "Validation failed for request parameters",
          404,
          errors.mapped()
        );
      }

      next();
    }
  );

  return paramsValidator;
};

export { validateParams as default, userSchema };
