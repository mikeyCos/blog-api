import { RequestHandler, Response } from "express";
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
import { BadRequestError } from "../errors/customErrors";

interface authController {
  authorize: RequestHandler;
  refreshToken: RequestHandler;
  login: RequestHandler[];
  logout: RequestHandler;
  signup: RequestHandler[];
}

const authController: authController = {
  authorize: asyncHandler(async (req, res) => {
    console.log("authorize");

    // if (!user && !accessToken)
    const { accessToken, user: userPayload } = req;

    console.log("userPayload:", userPayload);
    console.log("accessToken:", accessToken);
    // If current accessToken is valid
    // Return the accessToken and it's payload
    if (accessToken && userPayload) {
      console.log("accessToken && userPayload:", true);
      res.json({
        status: "success",
        code: 200,
        accessToken,
        user: { username: userPayload.username, role: userPayload.role },
      });
      return;
    }
  }),
  refreshToken: asyncHandler(async (req, res, next) => {
    // Create new accessToken unless the current accessToken is still valid
    console.log("refreshAccessToken middleware running...");
    // TODO
    // Refactor this endpoint
    console.log("req.refreshToken:", req.refreshToken);
    const defaultFailedResponse = {
      status: "fail",
      code: 403,
      accessToken: null,
      user: null,
      msg: `Invalid or expired refresh token`,
    };

    const { refreshToken } = req;

    if (!refreshToken) {
      /* return next({
        ...defaultFailedResponse,
        code: 401,
        msg: "Refresh token required",
      }); */
      throw new BadRequestError("Refresh token required", 401);
    }

    const { payload } = await verifyJWT(refreshToken);
    const user = payload && (await getUser(payload.user.id));
    const newAccessToken =
      user &&
      (await signJWT(
        { user: { id: user.id, username: user.username, role: user.role } },
        {
          expiresIn: 10,
        }
      ));

    if (newAccessToken) {
      res.json({
        status: "success",
        code: 200,
        accessToken: newAccessToken,
        user: { username: user.username, role: user.role },
      });
    }
  }),
  login: [
    validateLogin(),
    asyncHandler(async (req, res, next) => {
      console.log("login running...");
      await new Promise((resolve, reject) => {
        passport.authenticate(
          "local",
          { session: false },
          (err: Error, user: User, info: any) => {
            // User does not include blog, posts, or comments
            // console.log("err:", err);
            // console.log("user:", user);
            // console.log("info:", info);
            if (err) {
              console.log("login err:", err);
              // return next(err);
              return reject(err);
            }

            if (!user) {
              /* return next({
                status: "fail",
                code: 422,
                errors: { msg: info.message },
              }); */
              return reject(
                new BadRequestError("Login failed", 422, info.message)
              );
            }

            return req.login(user, { session: false }, async (err) => {
              // TODO
              // Create a private accessToken
              // Do not send private user properties
              const { id, username, role } = user;
              const accessTokenExpiresIn = 10; // 10 seconds
              const refreshTokenExpiresIn = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
              const accessToken = await signJWT(
                { user: { id, username, role } },
                { expiresIn: accessTokenExpiresIn }
              );
              const refreshToken = await Promise.resolve(
                signJWT(
                  { user: { id } },
                  {
                    expiresIn: `${refreshTokenExpiresIn}`,
                  }
                )
              );

              console.log("refreshToken:", refreshToken);
              console.log("accessToken:", accessToken);

              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 30 days
                maxAge: refreshTokenExpiresIn, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
                // maxAge: 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
                // maxAge: 20 * 1000, // 20 seconds * 1000 milliseconds
              });

              return res.json({
                status: "success",
                code: 200,
                accessToken,
                user: { username, role },
              });
            });
          }
        )(req, res, next);
      });
      /* passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: any) => {
          // User does not include blog, posts, or comments
          // console.log("err:", err);
          // console.log("user:", user);
          // console.log("info:", info);
          if (err) {
            console.log("login err:", err);
            return next(err);
          }
          if (!user) {
            return next({
              status: "fail",
              code: 422,
              errors: { msg: info.message },
            });
          }

          return req.login(user, { session: false }, async (err) => {
            // TODO
            // Create a private accessToken
            // Do not send private user properties
            const { id, username, role } = user;
            const accessTokenExpiresIn = 10; // 10 seconds
            const refreshTokenExpiresIn = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
            const accessToken = await signJWT(
              { user: { id, username, role } },
              { expiresIn: accessTokenExpiresIn }
            );
            const refreshToken = await Promise.resolve(
              signJWT(
                { user: { id } },
                {
                  expiresIn: `${refreshTokenExpiresIn}`,
                }
              )
            );

            console.log("refreshToken:", refreshToken);
            console.log("accessToken:", accessToken);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 30 days
              maxAge: refreshTokenExpiresIn, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
              // maxAge: 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
              // maxAge: 20 * 1000, // 20 seconds * 1000 milliseconds
            });

            return res.json({
              status: "success",
              code: 200,
              accessToken,
              user: { username, role },
            });
          });
        }
      )(req, res, next); */
    }),
  ],
  logout: asyncHandler(async (req, res) => {
    // TODO validate the token
    res.clearCookie("refreshToken");

    res.json({
      status: "success",
      code: 200,
      accessToken: null,
      user: null,
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

      // Should I redirect to '/auth/signup'?
      // Log in user when they sign up
      req.login(user, { session: false }, async (err) => {
        const { id, username, role } = user;
        const expiresIn = 10; // seconds
        const accessToken = await signJWT(
          { user: { id, username, role } },
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

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
          // maxAge: 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
          maxAge: 20 * 1000, // 20 seconds * 1000 milliseconds
        });

        return res.json({
          status: "success",
          code: 200,
          accessToken,
          user: { username, role },
        });
      });
    }),
  ],
};

export default authController;
