import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { verifyJWT } from "../utils/jwt.utils";

const authenticateToken: RequestHandler = (req, res, next) => {
  // Get authorization header value
  console.log("authenticateToken running...");
  // console.log(req.headers);
  // console.log(req.cookies);
  // console.log("req.user:", req.user);
  if (!req.user) {
    res.status(403).json({
      status: "fail",
      code: 403,
      data: { accessToken: null, user: null },
    });
    return;
  }

  return next();
};

const authenticateTokens: RequestHandler = async (req, res, next) => {
  // Get authorization header value
  console.log("authenticateToken running...");
  // console.log(req.headers);
  // console.log(req.cookies);
  // console.log("req.user:", req.user);

  const failedResponse = {
    status: "fail",
    code: 403,
    data: { accessToken: null, user: null },
  };

  const { accessToken, refreshToken } = req;

  if (!accessToken && !refreshToken) {
    res.status(403).json(failedResponse);
    return;
  }

  // Verify access and refresh tokens
  const { payload, expired } = await verifyJWT(accessToken!);
  const { payload: refresh } = await (expired && refreshToken
    ? verifyJWT(refreshToken)
    : Promise.resolve({ payload: null }));

  return next();
};

export default authenticateToken;
