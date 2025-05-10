import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, Schema, validationResult } from "express-validator";

const isInit = async (init: string) => {
  const initBoolean = init.toLocaleLowerCase() === "true";
  console.log("isInit init:", init);

  if (!initBoolean)
    return Promise.reject(`Query parameter init, ${init}, is not 'true'`);
};

const initSchema = {
  init: {
    trim: true,
    optional: {
      options: { nullable: true },
    },
    custom: {
      options: isInit,
    },
    escape: true,
    toBoolean: true,
  },
};

const validateQuery = (schema: Schema): RequestHandler => {
  const queryValidator: RequestHandler = asyncHandler(
    async (req, res, next) => {
      await checkSchema(schema, ["query"]).run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next({ status: "fail", code: 404, data: errors.mapped() });
      }

      next();
    }
  );

  return queryValidator;
};

export { validateQuery as default, initSchema };
