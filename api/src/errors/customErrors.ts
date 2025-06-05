export class APICustomError extends Error {
  statusCode: number;
  status: "fail" | "error";

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserNotFoundError extends APICustomError {
  constructor(identifier: string, isId: boolean) {
    super(
      `User with the ${
        isId ? `ID, ${identifier},` : `username, ${identifier},`
      } not found.`,
      404
    );
    this.name = "UserNotFoundError";
  }
}

export class BadRequestError extends APICustomError {
  details?: any;

  constructor(
    message: string = "Bad request",
    statusCode: number = 400,
    details?: any
  ) {
    super(message, statusCode);
    if (details) {
      this.details = details;
    }
  }
}
