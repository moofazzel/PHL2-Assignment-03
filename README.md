# 📚 Library Management API

A robust and scalable Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using Mongoose ODM. This API provides comprehensive book management and borrowing functionality with advanced features like aggregation pipelines, business logic enforcement, and real-time availability tracking.

## ✨ Features

### 🎯 Core Functionality

- **Complete CRUD Operations** for books with validation
- **Advanced Book Borrowing System** with business logic enforcement
- **Real-time Availability Tracking** with automatic updates
- **Comprehensive Error Handling** with standardized responses

### 🔍 Advanced Features

- **Smart Filtering & Sorting** by genre, date, and custom fields
- **MongoDB Aggregation Pipeline** for analytics and reporting
- **Mongoose Middleware** (pre/post hooks) for data integrity
- **Static & Instance Methods** for custom business logic
- **Schema Validation** with custom validators and constraints

### 🛡️ Security & Performance

- **Input Validation** with comprehensive error messages
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **TypeScript** for type safety and better development experience

## 🏗️ Architecture

```
src/
├── app.ts                    # Express application setup
├── server.ts                 # Server startup & database connection
├── index.ts                  # Application entry point
└── app/
    ├── config/
    │   └── config.ts         # Environment configuration
    ├── errors/
    │   ├── ApiError.ts       # Custom error class
    │   ├── pathNotFoundErrorHandler.ts
    │   └── validationError.ts
    ├── middlewares/
    │   └── globalErrorHandler.ts
    ├── modules/
    │   ├── books/            # Book module
    │   │   ├── books.constant.ts
    │   │   ├── books.controller.ts
    │   │   ├── books.interface.ts
    │   │   ├── books.router.ts
    │   │   ├── books.schema.ts
    │   │   └── books.service.ts
    │   └── borrow/           # Borrow module
    │       ├── borrow.controller.ts
    │       ├── borrow.interface.ts
    │       ├── borrow.router.ts
    │       ├── borrow.schema.ts
    │       └── borrow.service.ts
    ├── routers/
    │   └── router.ts         # Main router configuration
    └── util/
        ├── catchAsync.ts     # Async error handler
        └── sendResponse.ts   # Response formatter
```

## 🛠️ Tech Stack

| Technology     | Version | Purpose                       |
| -------------- | ------- | ----------------------------- |
| **Node.js**    | 18+     | Runtime environment           |
| **TypeScript** | 5.3+    | Type-safe JavaScript          |
| **Express.js** | 4.18+   | Web framework                 |
| **MongoDB**    | 6.0+    | NoSQL database                |
| **Mongoose**   | 8.0+    | MongoDB ODM                   |
| **CORS**       | 2.8+    | Cross-origin resource sharing |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library_management
```

### 4. Database Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: MongoDB Atlas (Recommended)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start Development Server

```bash
# Development mode with hot reload
npm run dev

# Or production mode
npm run build
npm start
```

### 6. Verify Installation

Visit `http://localhost:3000` to see the welcome message.

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### 📚 Book Management

#### Create a New Book

```http
POST /api/books
```

**Request:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

#### Get All Books with Filtering

```http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=10
```

**Query Parameters:**

- `filter` - Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sort` - Sort order (asc/desc)
- `sortBy` - Sort field (default: createdAt)
- `limit` - Number of results (default: 10)

#### Get Book by ID

```http
GET /api/books/:bookId
```

#### Update Book

```http
PUT /api/books/:bookId
```

**Request (Partial Update):**

```json
{
  "copies": 10
}
```

#### Delete Book

```http
DELETE /api/books/:bookId
```

### 📖 Borrowing System

#### Borrow a Book

```http
POST /api/borrow
```

**Request:**

```json
{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic:**

- ✅ Validates book existence
- ✅ Checks available copies
- ✅ Deducts quantity from book copies
- ✅ Updates book availability automatically
- ✅ Creates borrow record with due date

#### Get Borrowed Books Summary

```http
GET /api/borrow
```

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

## 🔧 Key Features

### 1. Schema Validation

- **Required Fields**: Title, author, genre, ISBN, copies
- **Genre Validation**: Only allowed genres accepted
- **ISBN Format**: 10 or 13 digit validation
- **Copies Validation**: Non-negative integers only
- **Due Date**: Must be in the future

### 2. Business Logic Enforcement

- **Automatic Availability Updates**: Books become unavailable when copies reach 0
- **Copy Deduction**: Real-time updates when books are borrowed
- **Validation Chain**: Multiple validation layers for data integrity

### 3. Advanced Querying

- **Filtering**: By genre, availability, date ranges
- **Sorting**: By any field in ascending/descending order
- **Pagination**: Limit results for performance
- **Aggregation**: Complex analytics using MongoDB pipelines

### 4. Error Handling

- **Standardized Responses**: Consistent error format across all endpoints
- **Detailed Validation Errors**: Specific field-level error messages
- **HTTP Status Codes**: Proper status codes for different error types

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set Environment Variables**

- `MONGODB_URI` - Your MongoDB connection string
- `NODE_ENV` - `production`

### Docker Deployment

```bash
# Build image
docker build -t library-api .

# Run container
docker run -p 3000:3000 -e MONGODB_URI=your_uri library-api
```

### Traditional Server

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Schema

### Book Collection

```javascript
{
  title: String (required, max 200 chars),
  author: String (required, max 100 chars),
  genre: String (enum: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY),
  isbn: String (required, unique, validated),
  description: String (optional, max 1000 chars),
  copies: Number (required, min 0, integer),
  available: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Borrow Collection

```javascript
{
  book: ObjectId (ref: Book, required),
  quantity: Number (required, min 1, integer),
  dueDate: Date (required, future date),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable cross-origin settings
- **Error Sanitization**: No sensitive data in error responses
- **Type Safety**: TypeScript prevents runtime errors

## 📝 Error Response Format

All errors follow a standardized format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Book validation failed",
    "details": {
      "copies": {
        "message": "Copies must be a non-negative integer",
        "value": -5
      }
    },
    "statusCode": 400
  }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Use conventional commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- 📖 **Documentation**: Check this README first
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Use GitHub Discussions for questions
- 📧 **Email**: Contact maintainers for urgent issues

### Common Issues

- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **Port Conflicts**: Change PORT in .env if 3000 is occupied
- **TypeScript Errors**: Run `npm run build` to check for compilation errors

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **MongoDB** for the powerful NoSQL database
- **Mongoose** team for the elegant ODM
- **TypeScript** team for type safety

---

**Made with ❤️ for the developer community**
