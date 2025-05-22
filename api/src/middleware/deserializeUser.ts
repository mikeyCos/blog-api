import { RequestHandler } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { getUser } from "../services/user";
import { User } from "../interfaces/user";

const deserializeUser: RequestHandler = async (req, res, next) => {
  console.clear();
  // console.log("req.headers:", req.headers);
  console.log("req.headers['authorization']:", req.headers["authorization"]);
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader && bearerHeader.split(" ")[1];
  const { refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) return next();

  // TODO
  // What if both accessToken and refreshToken exist?
  // accessToken should never be undefined
  const { payload, expired } = await verifyJWT(accessToken!);
  // accessToken is valid
  console.log("-----------------------------------------------");
  console.log("refreshToken:", refreshToken); // Not a falsy value
  console.log("expired:", expired);

  // Should the access token be valid if the refresh token is invalid?
  // accessToken is valid
  if (payload) {
    req.accessToken = accessToken;
    req.user = payload.user;
    // req.payload = payload;
    return next();
  }

  console.log("expired && refreshToken:", expired && refreshToken);
  // What if payload and expired are falsy values but refreshToken is truthy?
  // If payload and expired are falsy values but refreshToken is truthy, client refreshed page
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
