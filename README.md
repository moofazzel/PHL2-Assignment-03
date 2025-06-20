# 📚 Library Management API

A comprehensive Library Management System built with Express, TypeScript, and MongoDB using Mongoose.

## 🎯 Features

- **Complete CRUD Operations** for books
- **Advanced Filtering & Sorting** capabilities
- **Business Logic Enforcement** for book borrowing
- **MongoDB Aggregation Pipeline** for analytics
- **Mongoose Middleware** (pre/post hooks)
- **Static & Instance Methods** implementation
- **Schema Validation** with custom validators
- **Error Handling** with standardized responses
- **Security Features** (Helmet, CORS, Rate Limiting)

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd library-management-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Copy the example environment file
   cp env.example .env

   # Edit .env with your MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/library_management
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**

   ```bash
   # If using local MongoDB
   mongod

   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

5. **Run the application**

   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### 📚 Book Endpoints

#### 1. Create Book

```http
POST /api/books
```

**Request Body:**

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

#### 2. Get All Books (with filtering & sorting)

```http
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

**Query Parameters:**

- `filter`: Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sort`: Sort order (asc/desc)
- `sortBy`: Sort field (default: createdAt)
- `limit`: Number of results (default: 10)

#### 3. Get Book by ID

```http
GET /api/books/:bookId
```

#### 4. Update Book

```http
PUT /api/books/:bookId
```

**Request Body:**

```json
{
  "copies": 50
}
```

#### 5. Delete Book

```http
DELETE /api/books/:bookId
```

### 📖 Borrow Endpoints

#### 1. Borrow a Book

```http
POST /api/borrow
```

**Request Body:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic:**

- Validates book exists
- Checks available copies
- Deducts quantity from book copies
- Updates book availability if copies become 0
- Creates borrow record

#### 2. Get Borrowed Books Summary (Aggregation)

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

## 🏗️ Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   ├── bookController.ts    # Book CRUD operations
│   └── borrowController.ts  # Borrow operations
├── middleware/
│   └── errorHandler.ts      # Error handling middleware
├── models/
│   ├── Book.ts             # Book schema & methods
│   └── Borrow.ts           # Borrow schema & middleware
├── routes/
│   ├── bookRoutes.ts       # Book endpoints
│   └── borrowRoutes.ts     # Borrow endpoints
├── types/
│   └── index.ts            # TypeScript type definitions
└── index.ts                # Main server file
```

## 🔧 Key Features Implementation

### 1. Schema Validation

- **Book Model**: Required fields, enum validation, ISBN format validation
- **Borrow Model**: Positive quantity, future due date validation

### 2. Business Logic Enforcement

- **Availability Control**: Automatic availability updates based on copies
- **Copy Deduction**: Pre-save middleware validates and updates book copies
- **Instance Method**: `updateAvailability()` method on Book model

### 3. Mongoose Middleware

- **Pre-save**: Updates book availability when copies change
- **Post-save**: Logs book creation/updates
- **Borrow Pre-save**: Validates book existence and available copies

### 4. Aggregation Pipeline

- **Borrowed Books Summary**: Groups by book, sums quantities, joins with book info
- **Performance**: Indexed fields for optimal query performance

### 5. Static Methods

- **Book.findByGenre()**: Static method to find books by genre

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Standardized error responses

## 📝 Error Handling

All errors follow a standardized format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

## 🚀 Deployment

### Environment Variables

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library_management
NODE_ENV=production
```

### Build for Production

```bash
npm run build
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
