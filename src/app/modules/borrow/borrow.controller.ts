import { Request, Response } from "express";
import { BorrowService } from "./borrow.service";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrow = await BorrowService.borrowBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  const summary = await BorrowService.getBorrowedBooksSummary();
  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
};

export const BorrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};
