import ApiError from "../../errors/ApiError";
import { Book } from "../books/books.schema";
import { IBorrow, IBorrowDocument } from "./borrow.interface";
import { Borrow } from "./borrow.schema";

const borrowBook = async (borrowData: IBorrow): Promise<IBorrowDocument> => {
  // Validate quantity is positive
  if (borrowData.quantity <= 0) {
    throw new ApiError(400, "Quantity must be a positive number");
  }

  // Validate ObjectId format
  if (!require("mongoose").Types.ObjectId.isValid(borrowData.book)) {
    throw new ApiError(400, "Invalid book ID format");
  }

  const book = await Book.findById(borrowData.book);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (book.copies < borrowData.quantity) {
    throw new ApiError(
      400,
      `Not enough copies available. Available: ${book.copies}, Requested: ${borrowData.quantity}`
    );
  }

  const result = await Borrow.create(borrowData);
  return result;
};

const getBorrowedBooksSummary = async (): Promise<any> => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    {
      $unwind: "$bookInfo",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);
  return summary;
};

export const BorrowService = {
  borrowBook,
  getBorrowedBooksSummary,
};
