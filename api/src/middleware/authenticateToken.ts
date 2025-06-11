import { RequestHandler } from "express";

import { verifyJWT } from "../utils/jwt.utils";
import { BadRequestError } from "../errors/customErrors";

const authenticateToken: RequestHandler = async (req, res, next) => {
  console.log("authenticateToken running...");
  console.log("req.accessToken:", req.accessToken);
  const { accessToken } = req;

  if (!accessToken) {
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
