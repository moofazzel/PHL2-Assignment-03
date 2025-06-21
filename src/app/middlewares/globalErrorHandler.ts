/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import ApiError from "../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorData: any = error;

  if (error?.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errorData = {
      name: "ValidationError",
      errors: error.errors,
    };
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorData = error;
  } else if (error instanceof Error) {
    message = error?.message;
    errorData = error;
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: errorData,
  });
};

export default globalErrorHandler;
