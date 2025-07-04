import mongoose, { Schema } from "mongoose";
import { bookGenres } from "./books.constant";
import { IBookDocument, IBookModel } from "./books.interface";

const bookSchema = new Schema<IBookDocument, IBookModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: bookGenres,
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
      validate: [
        {
          validator: function (v: string) {
            // Remove any hyphens or spaces
            const cleanIsbn = v.replace(/[-\s]/g, "");
            return /^(?:\d{10}|\d{13})$/.test(cleanIsbn);
          },
          message:
            "ISBN must be exactly 10 or 13 digits (hyphens and spaces allowed)",
        },
        {
          validator: function (v: string) {
            // Check for valid characters
            return /^[\d\-\s]+$/.test(v);
          },
          message: "ISBN can only contain numbers, hyphens, and spaces",
        },
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a positive number"],
      validate: {
        validator: function (v: number) {
          return Number.isInteger(v) && v >= 0;
        },
        message: "Copies must be a non-negative integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  }
);

// Add ObjectId validation for bookId parameter
bookSchema.statics.validateObjectId = function (id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
};

bookSchema.methods.updateAvailability = async function (): Promise<void> {
  this.available = this.copies > 0;
  await this.save();
};

bookSchema.statics.findByGenre = function (
  genre: string
): Promise<IBookDocument[]> {
  return this.find({ genre });
};

bookSchema.pre("save", function (next) {
  if (this.isModified("copies")) {
    this.available = this.copies > 0;
  }
  next();
});

export const Book = mongoose.model<IBookDocument, IBookModel>(
  "Book",
  bookSchema
);
