import { RequestHandler } from "express";
import { verifyJWT } from "../utils/jwt.utils";

const deserializeUser: RequestHandler = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) return next();

  // TODO
  // What if both accessToken and refreshToken exist?
  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    req.user = payload;
    return next();
  }

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) return next();

  // Do something with refreshToken payload
  // Create new accessToken
  console.log("refresh:", refresh);

  return next();
};

export default deserializeUser;
