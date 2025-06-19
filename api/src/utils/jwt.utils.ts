import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

export const signJWT = async (
  payload: object,
  options: SignOptions
): Promise<string | null> => {
  return await new Promise((res, rej) => {
    jwt.sign(payload, "secretKey", options, (err, token) => {
      if (err || !token) return res(null);
      return res(token);
    });
  });
};

// jwt SignOptions expiresIn is type StringValue
/* export const signJWT = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, "secretKey", { expiresIn });
}; */

// https://stackoverflow.com/questions/27726066/jwt-refresh-token-flow
// Is there another way to write verifyJWT?
export const verifyJWT = async (
  token: string | null | undefined
): Promise<{ payload: null | JwtPayload; expired: boolean }> => {
  return await new Promise((res, rej) => {
    if (!token) {
      return res({
        payload: null,
        expired: true,
      });
    }

    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        console.log("verifyJWT err:", err);
        return res({
          payload: null,
          expired: err.name === "TokenExpiredError",
        });
      } else {
        return res({ payload: decoded as JwtPayload, expired: false });
      }
    });
  });
};
