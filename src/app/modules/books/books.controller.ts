import { Request, Response } from "express";
import { BookService } from "./books.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.createBook(req.body);
    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name || "ValidationError",
        message: error.message,
        details: error.errors || {},
        statusCode: 400,
      },
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooks(req.query);
    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error: {
        name: error.name || "RetrieveError",
        message: error.message,
        details: error.details || {},
        statusCode: 500,
      },
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve book",
      success: false,
      error: {
        name: error.name || "RetrieveError",
        message: error.message,
        details: error.details || {},
        statusCode: 500,
      },
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name || "ValidationError",
        message: error.message,
        details: error.errors || {},
        statusCode: 400,
      },
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to delete book",
      success: false,
      error: {
        name: error.name || "DeleteError",
        message: error.message,
        details: error.details || {},
        statusCode: 500,
      },
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
