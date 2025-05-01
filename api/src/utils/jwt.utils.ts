import jwt, { SignOptions, VerifyErrors, JwtPayload } from "jsonwebtoken";

export const signJWT = (payload: object, options: SignOptions) => {
  return jwt.sign(payload, "secretKey", options);
};

// jwt SignOptions expiresIn is type StringValue
/* export const signJWT = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, "secretKey", { expiresIn });
}; */

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, "secretKey") as JwtPayload;
    return { payload: decoded, expired: false };
  } catch (err) {
    const e = err as VerifyErrors;
    return { payload: null, expired: e.name === "TokenExpiredError" };
  }
};
