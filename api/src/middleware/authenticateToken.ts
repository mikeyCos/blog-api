import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { verifyJWT } from "../utils/jwt.utils";

/*
 * What is another way to write authenticateToken function involving access or refresh tokens without
 * returning a middleware and accepting a parameter?
 * Options:
 *  Request query or parameter
 *  Define two middlewares, each authenticates a specific token
 */
const authenticateToken: RequestHandler = async (req, res, next) => {
  console.log("authenticateToken running...");

  console.log("req.accessToken:", req.accessToken);
  const defaultFailedResponse = {
    status: "fail",
    code: 403,
    data: {
      accessToken: null,
      user: null,
      msg: `Invalid or expired access token`,
    },
  };

  const { accessToken } = req;

  if (!accessToken) {
    return next({
      ...defaultFailedResponse,
      code: 401,
      data: {
        ...defaultFailedResponse.data,
        msg: "Access token required",
      },
    });
  }

  const { payload } = await verifyJWT(accessToken);

  if (payload) {
    req.user = payload.user;
    return next();
  }

  return next(defaultFailedResponse);
};

export default authenticateToken;
