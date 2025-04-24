import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import validateLogin from "../validators/login.validator";
import { validateSignUp } from "../validators/validators";
import { User, CreateUser } from "../interfaces/user";
import { matchedData } from "express-validator";
import { createUser } from "../services/user";

interface authController {
  login: RequestHandler[];
  signup: RequestHandler[];
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
  signup: [
    validateSignUp(),
    asyncHandler(async (req, res, next) => {
      const { password, ...rest } = matchedData<CreateUser>(req, {
        onlyValidData: true,
      });

      // TODO
      // When would hashedPassword be undefined?
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err || !hashedPassword) return next(err);

        const user = await createUser({ password: hashedPassword, ...rest });

        req.login(user, { session: false }, (err) => {
          const expiresIn = 30; // seconds
          const token = jwt.sign({ user }, "secretKey", { expiresIn });
          return res.json({ token });
        });
      });
    }),
  ],
};

export default authController;
