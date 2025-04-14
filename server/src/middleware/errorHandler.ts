import { ErrorRequestHandler } from "express";

// Error middleware function
// Could make custom error object
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ status, message });
};

export default errorHandler;
