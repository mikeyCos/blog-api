import { RequestHandler } from "express";

export const logRequestMethod: RequestHandler = (req, res, next) => {
  console.log("req.method:", req.method);
  next();
};

export const logQuery: RequestHandler = (req, res, next) => {
  console.log("req.query:", req.query);
  next();
};
