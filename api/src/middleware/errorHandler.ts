import { ErrorRequestHandler } from "express";

// TODO
// Create error type
// Error middleware function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("errorHandler running...");
  console.log("err:", err);
  const { status, code, errors } = err;
  res.status(code).json({ status, code, errors });
};

export default errorHandler;
