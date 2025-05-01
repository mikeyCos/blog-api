import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const authenticateToken: RequestHandler = (req, res, next) => {
  // Get authorization header value
  console.log("authenticateToken running...");
  // console.log(req.headers);
  // console.log(req.cookies);
  const bearerHeader = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];
  // User is logged in
  //  req.cookies["refresh_token"] is defined
  //  req.headers["authorization"] is defined
  // User is not logged in
  //  req.cookies["refresh_token"] is undefined
  //  req.headers["authorization"] is undefined

  console.log(`req.headers["authorization"]:`, req.headers["authorization"]);
  console.log("--------------------------");
  console.log("req.cookies.refresh_token:", req.cookies["refreshToken"]);
  console.log("--------------------------");
  console.log("typeof bearerHeader:", typeof bearerHeader);
  console.log("--------------------------");

  if (typeof bearerHeader !== "undefined" || refreshToken) {
    // Will need to split bearerHeader, and use the element at index 1
    // bearHeader.split(" ")[1];
    const accessToken = bearerHeader;
    res.locals.accessToken = accessToken;
    // TODO
    // Type verify callback
    // For now, err: VerifyErrors | null and authData: any
    jwt.verify(
      accessToken ?? refreshToken,
      "secretKey",
      async (err: VerifyErrors | null, authData: any) => {
        if (err) {
          // If expired need to create new accessToken
          // Otherwise, return 403
          console.log(err);
          return res.sendStatus(403);
        } else {
          const { user } = authData;
          console.log("authData:", authData);
          // res.locals.user = { ...user };
          req.user = user;
          next();
        }
      }
    );
  } else {
    // Forbidden
    res.sendStatus(401);
  }
};

export default authenticateToken;
