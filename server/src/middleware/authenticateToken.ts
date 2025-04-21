import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const authenticateToken: RequestHandler = (req, res, next) => {
  // Get authorization header value
  console.log("verifyToken running...");
  console.log(`req.headers["authorization"]:`, req.headers["authorization"]);
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Will need to split bearerHeader, and use the element at index 1
    // bearHeader.split(" ")[1];
    console.log("bearerHeader.split(' ')[1]:", bearerHeader.split(" ")[1]);
    const token = bearerHeader;
    res.locals.token = token;
    // TODO
    // Type verify callback
    // For now, err: VerifyErrors | null and authData: any
    jwt.verify(
      res.locals.token,
      "secretKey",
      async (err: VerifyErrors | null, authData: any) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          const { user } = authData;
          console.log("authData:", authData);
          res.locals.user = { ...user };
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
