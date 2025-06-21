import { NextFunction, Request, Response } from "express";

const pathNotFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    message: "Not Found",
    success: false,
    error: {
      path: req.originalUrl,
      message: "API endpoint not found",
    },
  });
};

export default pathNotFoundErrorHandler;
