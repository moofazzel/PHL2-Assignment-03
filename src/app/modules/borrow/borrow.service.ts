import { Book } from "../books/books.schema";
import { IBorrow, IBorrowDocument } from "./borrow.interface";
import { Borrow } from "./borrow.schema";

const borrowBook = async (borrowData: IBorrow): Promise<IBorrowDocument> => {
  const book = await Book.findById(borrowData.book);
  if (!book) {
    const error = new Error("Book not found");
    (error as any).name = "BookNotFoundError";
    (error as any).statusCode = 404;
    throw error;
  }

  if (book.copies < borrowData.quantity) {
    const error = new Error(
      `Not enough copies available. Available: ${book.copies}, Requested: ${borrowData.quantity}`
    );
    (error as any).name = "InsufficientCopiesError";
    (error as any).statusCode = 400;
    (error as any).details = {
      available: book.copies,
      requested: borrowData.quantity,
    };
    throw error;
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
