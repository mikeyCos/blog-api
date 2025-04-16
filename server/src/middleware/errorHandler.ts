import { ErrorRequestHandler } from "express";

// Error middleware function
// Could make custom error object
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status, message, errors } = err;
  res.status(status).json({ status, message, errors });
};

export default errorHandler;
