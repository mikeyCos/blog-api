import { RequestHandler } from "express";

import { verifyJWT } from "../utils/jwt.utils";
import { BadRequestError } from "../errors/customErrors";

const authenticateToken: RequestHandler = async (req, res, next) => {
  console.log("authenticateToken running...");

  console.log("req.accessToken:", req.accessToken);
  const defaultFailedResponse = {
    status: "fail",
    code: 403,
    accessToken: null,
    user: null,
    msg: `Invalid or expired access token`,
  };

  const { accessToken } = req;

  if (!accessToken) {
    /* return next({
      ...defaultFailedResponse,
      code: 401,
      msg: "Access token required",
    }); */
    throw new BadRequestError("Access token required.", 401);
  }

  const { payload } = await verifyJWT(accessToken);

  if (payload) {
    req.user = payload.user;
    return next();
  }

  throw new BadRequestError("Invalid or expired access token.", 403);
};

export default authenticateToken;
