/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import ApiError from "../errors/ApiError";
import handleValidationError from "../errors/validationError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorData: any = error;

  if (error?.name === "ValidationError") {
    const validationError = handleValidationError(
      error as mongoose.Error.ValidationError
    );
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorData = {
      name: "ValidationError",
      message: validationError.message,
      details: validationError.errorMessages,
      statusCode: validationError.statusCode,
    };
  } else if (error?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    errorData = {
      name: "CastError",
      message: "Invalid ID format",
      details: { path: error.path, value: error.value },
      statusCode: 400,
    };
  } else if (error?.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(error.keyValue)[0];
    message =
      duplicateField === "isbn"
        ? "ISBN already exists"
        : "Duplicate field value";
    errorData = {
      name: "DuplicateError",
      message: message,
      details: {
        field: duplicateField,
        value: error.keyValue[duplicateField],
        help:
          duplicateField === "isbn"
            ? "Each book must have a unique ISBN. Please check if this book is already in the system."
            : undefined,
      },
      statusCode: 409,
    };
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorData = {
      name: error.name || "ApiError",
      message: error.message,
      statusCode: error.statusCode,
    };
  } else if (error instanceof Error) {
    message = error?.message;
    errorData = {
      name: error.name || "Error",
      message: error.message,
      statusCode: 500,
    };
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: errorData,
  });
};

export default globalErrorHandler;
