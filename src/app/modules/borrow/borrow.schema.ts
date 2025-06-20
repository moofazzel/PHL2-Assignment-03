import mongoose, { Schema } from "mongoose";
import { Book } from "../books/books.schema";
import { IBorrowDocument } from "./borrow.interface";

const borrowSchema = new Schema<IBorrowDocument>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (v: Date) {
          return v > new Date();
        },
        message: "Due date must be in the future",
      },
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (book) {
    book.copies -= this.quantity;
    await book.save();
  }
  next();
});

export const Borrow = mongoose.model<IBorrowDocument>("Borrow", borrowSchema);
