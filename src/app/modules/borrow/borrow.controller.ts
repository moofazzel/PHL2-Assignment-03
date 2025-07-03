import { Request, Response } from "express";
import { BorrowService } from "./borrow.service";

const borrowBook = async (req: Request, res: Response) => {
  const borrow = await BorrowService.borrowBook(req.body);
  return res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
};

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  const summary = await BorrowService.getBorrowedBooksSummary();
  return res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
};

export const BorrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};
