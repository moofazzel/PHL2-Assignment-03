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
      success: false,
      message: error.message || "Failed to create book",
      error: error,
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
      success: false,
      message: error.message || "Failed to retrieve books",
      error: error,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await BookService.getBookById(req.params.bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve book",
      error: error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.updateBook(req.params.bookId, req.body);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update book",
      error: error,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.deleteBook(req.params.bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete book",
      error: error,
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
