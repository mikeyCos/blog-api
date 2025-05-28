import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { verifyJWT } from "../utils/jwt.utils";

interface AuthenticateToken {
  (tokenType?: "refresh" | "access"): RequestHandler;
}

const authenticateToken: AuthenticateToken = (tokenType = "access") => {
  return async (req, res, next) => {
    console.log("authenticateToken running...");

    console.log("req.refreshToken:", req.refreshToken);
    console.log("req.accessToken:", req.accessToken);
    const defaultFailedResponse = {
      status: "fail",
      code: 403,
      data: {
        accessToken: null,
        user: null,
        msg: `Invalid or expired ${tokenType} token`,
      },
    };

    const token = req[`${tokenType}Token`];

    if (!token) {
      return next({
        ...defaultFailedResponse,
        code: 401,
        data: {
          ...defaultFailedResponse.data,
          msg: `${
            tokenType.charAt(0).toUpperCase() + tokenType.slice(1)
          } token required`,
        },
      });
    }

    const { payload } = await verifyJWT(token);

    if (payload) {
      req.user = payload.user;
      return next();
    }

    return next(defaultFailedResponse);
  };
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

export default authenticateToken;
