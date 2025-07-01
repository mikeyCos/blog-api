import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors";
import { RoleName as allowedRoles } from "../prisma/generated/prisma";

interface ValidDataPostSchema {
  username: string;
  postPublicId: number;
  postSlugTitle: string;
}

const isValidRole = async (roleName: string) => {
  console.group("isValidRole running...");
  console.log("allowedRoles:", allowedRoles);
  console.log(allowedRoles[roleName as keyof typeof allowedRoles]);
  console.log();
  console.groupEnd();
};

const userSchema: Schema = {
  userId: {
    trim: true,
    notEmpty: {
      bail: true,
    },
    escape: true,
  },
};

// TODO
// custom validation for username and postSlugTitle
const postSchema: Schema = {
  username: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "username" cannot be left empty',
      bail: true,
    },
    escape: true,
  },
  postId: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "postId" cannot be left empty',
      bail: true,
    },
    isUUID: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    escape: true,
  },
  postPublicId: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "postPublicId" cannot be left empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'Parameter "postPublicId" must be numeric',
      options: {
        no_symbols: true,
      },
    },
    optional: {
      options: {
        nullable: true,
      },
    },
    escape: true,
    toInt: true,
  },
  postSlugTitle: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "username" cannot be left empty',
      bail: true,
    },
    optional: {
      options: {
        nullable: true,
      },
    },
    escape: true,
  },
  commentId: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "commentId" cannot be left empty',
      bail: true,
    },
    optional: {
      options: {
        nullable: true,
      },
    },
    escape: true,
  },
};

const roleSchema: Schema = {
  role: {
    trim: true,
    notEmpty: {
      errorMessage: 'Parameter "roleName" cannot be left empty',
      bail: true,
    },
    custom: {
      options: isValidRole,
      errorMessage: 'Parameter "roleName" is invalid',
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
        console.group("validateParams error thrown...");
        console.log("errors.mapped():", errors.mapped());
        console.groupEnd();
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

export {
  validateParams as default,
  userSchema,
  postSchema,
  roleSchema,
  ValidDataPostSchema,
};
