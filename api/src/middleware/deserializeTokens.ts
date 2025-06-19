import { RequestHandler } from "express";

// Extract tokens from request headers and cookies
const deserializeTokens: RequestHandler = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader && bearerHeader.split(" ")[1];
  const { refreshToken } = req.cookies;

  req.accessToken = accessToken;
  req.refreshToken = refreshToken;
  return next();
};

export default deserializeTokens;
