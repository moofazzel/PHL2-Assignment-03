import { NextFunction, Request, Response } from "express";

const pathNotFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: {
      path: req.originalUrl,
      message: "API endpoint not found",
    },
  });
};

export default pathNotFoundErrorHandler;
