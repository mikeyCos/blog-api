import { ErrorRequestHandler } from "express";
import { APICustomError, BadRequestError } from "../errors/customErrors";
import { error } from "console";

interface ErrorResponse {
  status: string;
  code: number;
  message: string;
  errors?: Record<string, any> | string;
}
// TODO
// Create error type
// Error middleware function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("errorHandler running...");
  console.log("err:", err);

  const status: string = "fail";
  let statusCode: number = err.statusCode || 500;
  let message: string = "Something went wrong";
  let errors: Record<string, any> | undefined;

  if (err instanceof APICustomError) {
    if (err instanceof BadRequestError && err.details) {
      errors = err.details;
    }
  }

  const errorResponse: ErrorResponse = {
    status,
    code: statusCode,
    message: err.message,
  };

  if (errors && Object.keys(errors).length > 0) {
    errorResponse.errors = errors;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
