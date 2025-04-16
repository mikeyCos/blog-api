import { RequestHandler } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
import prisma from "../config/prisma";

const usernameValidator = async (username: string) => {
  // Test against regex
  // Make sure username is not taken
  const regex = new RegExp("^[a-zA-Z\\-\\_]{3,15}$");
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const regexResult = regex.test(username);

  // If regexResult and user are falsy values
  // Throw error or reject Promise
  if (!regexResult) throw new Error();
  if (user) throw new Error("Username taken.");
  return Promise.resolve();
};

const userSchema: Schema = {
  username: {
    trim: true,
    custom: {
      options: usernameValidator,
    },
    errorMessage:
      "Username must be between 3 and 15 letters long. Dashes and underscores are the only acceptable symbols.",
    escape: true,
  },
  password: {
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    isLength: {
      options: {
        max: 12,
      },
    },
    errorMessage:
      "Password must be between 8 and 12 characters long with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
    escape: true,
  },
};

const validateCreateUser = (): RequestHandler => {
  const createUserValidator: RequestHandler = async (req, res, next) => {
    await checkSchema(userSchema, ["body"]).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 422,
        message: "Unprocessable Content",
        errors: errors.mapped(),
      });
    }

    next();
  };

  return createUserValidator;
};

export default validateCreateUser;
