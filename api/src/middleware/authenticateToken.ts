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

// Authenticates tokens and extracts tokens' payloads
const authenticateTokens: RequestHandler = async (req, res, next) => {
  console.log("authenticateToken running...");

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

  // Verify access token
  const { payload, expired } = await verifyJWT(accessToken);

  if (payload) {
    req.user = payload.user;
    return next();
  }

  // If the access token is invalid
  // Verify refresh token
  const { payload: refresh } = await (expired && refreshToken
    ? verifyJWT(refreshToken)
    : Promise.resolve({ payload: null }));

  if (!refresh) {
    res.status(403).json(failedResponse);
    return;
  }

  const { user } = refresh;
  req.user = user;
  req.accessToken = null;

  return next();
};

// export default authenticateToken;
export default authenticateTokens;
