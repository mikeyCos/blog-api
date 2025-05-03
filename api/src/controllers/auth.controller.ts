import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import validateLogin from "../validators/login.validator";
import { validateSignUp } from "../validators/validators";
import { User, CreateUser } from "../interfaces/user";
import { matchedData } from "express-validator";
import { createUser, getUser } from "../services/user";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

/* declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    accessToken?: string;
  }
} */

interface authController {
  authorize: RequestHandler;
  refreshAccessToken: RequestHandler;
  login: RequestHandler[];
  logout: RequestHandler;
  signup: RequestHandler[];
}

const authController: authController = {
  authorize: asyncHandler(async (req, res) => {
    console.log("authorize");
    res.json({ status: "success", code: 200 });
  }),
  refreshAccessToken: asyncHandler(async (req, res, next) => {
    /* const refreshToken = jwt.sign({ user }, "apples", {
      expiresIn: "30d",
    }); */
    // Create new accessToken
    if (req.user) {
      // console.log("typeof req.user:", typeof req.user)
      const userRefresh = req.user as User;
      console.log("userRefresh:", userRefresh);
      const user = await getUser(userRefresh.id);
      console.log(user);
    }
  }),
  login: [
    validateLogin(),
    asyncHandler(async (req, res, next) => {
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: any) => {
          // User does not include blog, posts, or comments
          // console.log("err:", err);
          // console.log("user:", user);
          // console.log("info:", info);
          if (err) return next(err);
          if (!user)
            return next({
              status: "fail",
              code: 422,
              data: { message: info.message },
            });

          return req.login(user, { session: false }, async (err) => {
            // TODO
            // Create a private accessToken
            // Do not send private user properties
            const { id, username, role } = user;
            const expiresIn = 30; // seconds
            const accessToken = await signJWT(
              { user: { username, role } },
              { expiresIn }
            );
            const refreshToken = await Promise.resolve(
              signJWT(
                { user: { id } },
                {
                  expiresIn: "30d",
                }
              )
            );

            console.log("refreshToken:", refreshToken);
            console.log("accessToken:", accessToken);

            if (accessToken) {
              verifyJWT(accessToken);
            }

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            });

            return res.json({
              status: "success",
              code: 200,
              data: { accessToken, user: { username, role } },
            });
          });
        }
      )(req, res, next);
    }),
  ],
  logout: asyncHandler(async (req, res) => {
    // TODO validate the token
    res.clearCookie("refreshToken");

    res.json({
      status: "success",
      code: 200,
      data: { accessToken: null, user: null },
    });
  }),
  signup: [
    validateSignUp(),
    asyncHandler(async (req, res, next) => {
      const { password, ...rest } = matchedData<CreateUser>(req, {
        onlyValidData: true,
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser({ password: hashedPassword, ...rest });

      // Log in user when they sign up
      req.login(user, { session: false }, (err) => {
        const expiresIn = 30; // seconds
        const token = signJWT({ user }, { expiresIn });
        return res.json({
          status: "success",
          code: 200,
          data: { access_token: token },
        });
      });
    }),
  ],
};

export default authController;
