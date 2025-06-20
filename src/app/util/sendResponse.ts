import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null
): void => {
  const response: IApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export default sendResponse;
