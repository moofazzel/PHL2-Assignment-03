import { IBook, IBookDocument } from "./books.interface";
import { Book } from "./books.schema";

const createBook = async (bookData: IBook): Promise<IBookDocument> => {
  const result = await Book.create(bookData);
  return result;
};

const getAllBooks = async (
  query: Record<string, any>
): Promise<IBookDocument[]> => {
  const { filter, sort = "asc", sortBy = "createdAt", limit = 10 } = query;

  const queryObj: Record<string, any> = {};
  if (filter) {
    queryObj.genre = filter;
  }

  const sortObj: Record<string, any> = {};
  sortObj[sortBy] = sort === "desc" ? -1 : 1;

  const result = await Book.find(queryObj).sort(sortObj).limit(Number(limit));
  return result;
};

const getBookById = async (bookId: string): Promise<IBookDocument | null> => {
  const result = await Book.findById(bookId);
  return result;
};

const updateBook = async (
  bookId: string,
  updateData: Partial<IBook>
): Promise<IBookDocument | null> => {
  // Check for unknown fields
  const allowedFields = [
    "title",
    "author",
    "genre",
    "isbn",
    "description",
    "copies",
    "available",
  ];
  const unknownFields = Object.keys(updateData).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    const error = new Error(`Unknown fields: ${unknownFields.join(", ")}`);
    (error as any).name = "ValidationError";
    (error as any).statusCode = 400;
    throw error;
  }

  const result = await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBook = async (bookId: string): Promise<IBookDocument | null> => {
  const result = await Book.findByIdAndDelete(bookId);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
