import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { getUser } from "../services/user";
import { BadRequestError } from "../errors/customErrors";

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

const validateLogin = (): RequestHandler => {
  const loginValidator: RequestHandler = asyncHandler(
    async (req, res, next): Promise<any> => {
      console.log("req.body:", req.body);
      await checkSchema(authSchema, ["body"]).run(req);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // TODO
        // Send errors to client
        // May need to map errors; errors.mapped()
        // next({ status: "fail", code: 401, errors: errors.mapped() });
        throw new BadRequestError("Login failed", 401, errors.mapped());
      }

      next();
    }
  );

  return loginValidator;
};

export default validateLogin;
