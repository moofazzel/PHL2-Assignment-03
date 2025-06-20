import express from "express";
import request from "supertest";
import { connectDB, disconnectDB } from "../src/config/database";
import { errorHandler } from "../src/middleware/errorHandler";
import bookRoutes from "../src/routes/bookRoutes";
import borrowRoutes from "../src/routes/borrowRoutes";

const app = express();
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use(errorHandler);

describe("Library Management API", () => {
  let bookId: string;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe("Book Endpoints", () => {
    test("POST /api/books - Create a new book", async () => {
      const bookData = {
        title: "The Theory of Everything",
        author: "Stephen Hawking",
        genre: "SCIENCE",
        isbn: "9780553380163",
        description: "An overview of cosmology and black holes.",
        copies: 5,
        available: true,
      };

      const response = await request(app)
        .post("/api/books")
        .send(bookData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Book created successfully");
      expect(response.body.data.title).toBe(bookData.title);
      expect(response.body.data.author).toBe(bookData.author);
      expect(response.body.data.genre).toBe(bookData.genre);
      expect(response.body.data.isbn).toBe(bookData.isbn);
      expect(response.body.data.copies).toBe(bookData.copies);
      expect(response.body.data.available).toBe(bookData.available);

      bookId = response.body.data._id;
    });

    test("GET /api/books - Get all books", async () => {
      const response = await request(app).get("/api/books").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Books retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    test("GET /api/books with filtering", async () => {
      const response = await request(app)
        .get("/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Books retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("GET /api/books/:bookId - Get book by ID", async () => {
      const response = await request(app)
        .get(`/api/books/${bookId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Book retrieved successfully");
      expect(response.body.data._id).toBe(bookId);
    });

    test("PUT /api/books/:bookId - Update book", async () => {
      const updateData = {
        copies: 10,
      };

      const response = await request(app)
        .put(`/api/books/${bookId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Book updated successfully");
      expect(response.body.data.copies).toBe(updateData.copies);
    });

    test("DELETE /api/books/:bookId - Delete book", async () => {
      const response = await request(app)
        .delete(`/api/books/${bookId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Book deleted successfully");
      expect(response.body.data).toBe(null);
    });
  });

  describe("Borrow Endpoints", () => {
    let testBookId: string;

    beforeEach(async () => {
      // Create a test book for borrowing
      const bookData = {
        title: "Test Book for Borrowing",
        author: "Test Author",
        genre: "FICTION",
        isbn: "9781234567890",
        description: "A test book for borrowing functionality.",
        copies: 3,
        available: true,
      };

      const response = await request(app).post("/api/books").send(bookData);

      testBookId = response.body.data._id;
    });

    test("POST /api/borrow - Borrow a book", async () => {
      const borrowData = {
        book: testBookId,
        quantity: 2,
        dueDate: "2025-07-18T00:00:00.000Z",
      };

      const response = await request(app)
        .post("/api/borrow")
        .send(borrowData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Book borrowed successfully");
      expect(response.body.data.book).toBe(testBookId);
      expect(response.body.data.quantity).toBe(borrowData.quantity);
    });

    test("GET /api/borrow - Get borrowed books summary", async () => {
      const response = await request(app).get("/api/borrow").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Borrowed books summary retrieved successfully"
      );
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("POST /api/borrow - Should fail when not enough copies", async () => {
      const borrowData = {
        book: testBookId,
        quantity: 5, // More than available copies (3)
        dueDate: "2025-07-18T00:00:00.000Z",
      };

      const response = await request(app)
        .post("/api/borrow")
        .send(borrowData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Not enough copies available");
    });
  });

  describe("Validation Tests", () => {
    test("POST /api/books - Should fail with invalid genre", async () => {
      const invalidBookData = {
        title: "Invalid Genre Book",
        author: "Test Author",
        genre: "INVALID_GENRE",
        isbn: "9781234567891",
        copies: 1,
      };

      const response = await request(app)
        .post("/api/books")
        .send(invalidBookData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test("POST /api/books - Should fail with negative copies", async () => {
      const invalidBookData = {
        title: "Negative Copies Book",
        author: "Test Author",
        genre: "FICTION",
        isbn: "9781234567892",
        copies: -1,
      };

      const response = await request(app)
        .post("/api/books")
        .send(invalidBookData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test("POST /api/borrow - Should fail with past due date", async () => {
      const invalidBorrowData = {
        book: "507f1f77bcf86cd799439011", // Dummy ObjectId
        quantity: 1,
        dueDate: "2020-01-01T00:00:00.000Z", // Past date
      };

      const response = await request(app)
        .post("/api/borrow")
        .send(invalidBorrowData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
