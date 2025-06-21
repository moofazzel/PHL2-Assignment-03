import { Request, Response } from "express";
import { BorrowService } from "./borrow.service";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrow = await BorrowService.borrowBook(req.body);
    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      message: "Borrow failed",
      success: false,
      error: {
        name: error.name || "BorrowError",
        message: error.message,
        details: error.details || {},
        statusCode: statusCode,
      },
    });
  }
};

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await BorrowService.getBorrowedBooksSummary();
    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve borrowed books summary",
      success: false,
      error: {
        name: error.name || "SummaryError",
        message: error.message,
        details: error.details || {},
      },
    });
  }
};

export const BorrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};
