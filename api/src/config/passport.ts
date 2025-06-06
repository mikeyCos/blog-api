// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

import { getUser } from "../services/user";

const verifyCallback = async (
  username: string,
  password: string,
  done: Function
) => {
  console.log("LocalStrategy verifyCallback running...");
  try {
    console.log("username:", username);
    console.log("password:", password);
    const user = await getUser(null, username);
    console.log("user:", user);

    // user.password should not be undefined/null if the user exists
    const match = user && (await bcrypt.compare(password, user.password!));

    if (!user || !match) {
      return done(null, false, { msg: "Invalid username or password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

/* const verifyCallback = async (jwt_payload: any, done: Function) => {};

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = "secret";
const issue = "";
const audience = "";

const jwtStrategyOptions = {
  jwtFromRequest,
  secretOrKey,
};
 */
// const strategy = new JwtStrategy(jwtStrategyOptions, verifyCallback);
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
