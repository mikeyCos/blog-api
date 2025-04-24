import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import jwt from "jsonwebtoken";

import validateLogin from "../validators/login.validator";
import { User } from "../interfaces/user";

interface authController {
  login: RequestHandler[];
}

const authController: authController = {
  login: [
    validateLogin(),
    asyncHandler(async (req, res, next) => {
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: any) => {
          // User does not include blog, posts, or comments
          console.log("err:", err);
          console.log("user:", user);
          console.log("info:", info);
          if (err) return next(err);
          if (!user)
            return next({
              status: "fail",
              code: 422,
              data: { message: info.message },
            });

          return req.login(user, { session: false }, (err) => {
            // TODO
            // Create a private accessToken
            const expiresIn = 30; // seconds
            const token = jwt.sign({ user }, "secretKey", { expiresIn });
            return res.json({ token });
          });
        }
      )(req, res, next);
    }),
  ],
};

export default authController;
