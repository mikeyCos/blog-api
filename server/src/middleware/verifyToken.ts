import { RequestHandler } from "express";

const verifyToken: RequestHandler = (req, res, next) => {
  // Get auth header value
  console.log("verifyToken running...");
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader;
    res.locals.token = token;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

export default verifyToken;
