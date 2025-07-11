import { RequestHandler } from "express";

// Extract tokens from request headers and cookies
const deserializeTokens: RequestHandler = async (req, res, next) => {
  console.clear();
  console.group("deserializeTokens running...");
  console.log("req.headers:", req.headers);
  console.groupEnd();
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader && bearerHeader.split(" ")[1];
  const { refreshToken } = req.cookies;

  req.accessToken = accessToken;
  req.refreshToken = refreshToken;
  return next();
};

export default deserializeTokens;
