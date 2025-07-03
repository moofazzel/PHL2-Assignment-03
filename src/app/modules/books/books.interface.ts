import { Document, Model } from "mongoose";

export type BookGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBookDocument extends IBook, Document {
  updateAvailability(): Promise<void>;
}

export interface IBookModel extends Model<IBookDocument> {
  findByGenre(genre: BookGenre): Promise<IBookDocument[]>;
  validateObjectId(id: string): boolean;
}
