import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import jwt from "jsonwebtoken";

import validateAuth from "../validators/auth.validator";
import { User } from "../interfaces/user";

interface authController {
  auth: RequestHandler[];
}

const authController: authController = {
  auth: [
    validateAuth(),
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
          if (!user) return next({ status: 422, message: info.message });

          // return req.login(user, { session: false }, next);
          return req.login(user, { session: false }, (err) => {
            const token = jwt.sign({ user }, "secretKey");
            return res.json({ token });
          });
        }
      )(req, res, next);
    }),
    (req, res) => {
      res.json({ message: "authorized" });
    },
  ],
};

export default authController;
