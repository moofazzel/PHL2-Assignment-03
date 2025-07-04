import { Request, Response } from "express";
import { BookService } from "./books.service";

const createBook = async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  return res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
};

const getAllBooks = async (req: Request, res: Response) => {
  const books = await BookService.getAllBooks(req.query);
  return res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};

const getBookById = async (req: Request, res: Response) => {
  const book = await BookService.getBookById(req.params.bookId);
  if (!book) {
    return res.status(404).json({
      message: "Book not found",
      success: false,
      error: {
        name: "BookNotFoundError",
        message: "Book not found",
        details: { bookId: req.params.bookId },
        statusCode: 404,
      },
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};

const updateBook = async (req: Request, res: Response) => {
  const book = await BookService.updateBook(req.params.bookId, req.body);
  if (!book) {
    return res.status(404).json({
      message: "Book not found",
      success: false,
      error: {
        name: "BookNotFoundError",
        message: "Book not found",
        details: { bookId: req.params.bookId },
        statusCode: 404,
      },
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
};

const deleteBook = async (req: Request, res: Response) => {
  const book = await BookService.deleteBook(req.params.bookId);
  if (!book) {
    return res.status(404).json({
      message: "Book not found",
      success: false,
      error: {
        name: "BookNotFoundError",
        message: "Book not found",
        details: { bookId: req.params.bookId },
        statusCode: 404,
      },
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
