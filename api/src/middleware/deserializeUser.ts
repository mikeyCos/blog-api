import { RequestHandler } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { getUser } from "../services/user";
import { User } from "../interfaces/user";

const deserializeUser: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) return next();

  // TODO
  // What if both accessToken and refreshToken exist?
  console.log("accessToken:", accessToken);
  const { payload, expired } = await verifyJWT(accessToken);
  console.log("payload:", payload);
  if (payload) {
    // req.user = payload;
    return next();
  }

  console.log("-----------------------------------------------");
  console.log("refreshToken:", refreshToken); // Not a falsy value
  console.log("expired:", expired);
  console.log("expired && refreshToken:", expired && refreshToken);
  // What if payload and expired are falsy values but refreshToken is truthy?
  const { payload: refresh } = await (expired && refreshToken
    ? verifyJWT(refreshToken)
    : Promise.resolve({ payload: null }));

  if (!refresh) return next();

  // Do something with refreshToken payload
  // Create new accessToken
  console.log("refresh:", refresh);
  const { user } = refresh;
  req.user = user;

  return next();
};

export default deserializeUser;
