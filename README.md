# �� Library Management System API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen.svg)](https://minimal-library-management-system.vercel.app/)

A robust and scalable **Library Management System API** built with **Express.js**, **TypeScript**, and **MongoDB**. This RESTful API provides comprehensive book management and borrowing functionality with advanced features like real-time availability tracking, business logic enforcement, and comprehensive error handling.

## 🌟 Live Demo

**🔗 API Base URL:** [https://minimal-library-management-system.vercel.app/](https://minimal-library-management-system.vercel.app/)

## ✨ Key Features

### 🎯 Core Functionality

- **Complete CRUD Operations** for books with comprehensive validation
- **Advanced Book Borrowing System** with business logic enforcement
- **Real-time Availability Tracking** with automatic updates
- **Comprehensive Error Handling** with standardized API responses

### 🔍 Advanced Features

- **Smart Filtering & Sorting** by genre, date, and custom fields
- **MongoDB Aggregation Pipeline** for analytics and reporting
- **Mongoose Middleware** (pre/post hooks) for data integrity
- **Static & Instance Methods** for custom business logic
- **Schema Validation** with custom validators and constraints

### 🛡️ Security & Performance

- **Input Validation** with comprehensive error messages
- **Rate Limiting** to prevent API abuse
- **CORS Configuration** for cross-origin requests
- **TypeScript** for type safety and enhanced development experience
- **Helmet.js** for security headers

## 🏗️ Project Architecture

```
src/
├── app.ts                    # Express application setup
├── server.ts                 # Server startup & database connection
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
    │   ├── books/            # Book management module
    │   │   ├── books.constant.ts
    │   │   ├── books.controller.ts
    │   │   ├── books.interface.ts
    │   │   ├── books.router.ts
    │   │   ├── books.schema.ts
    │   │   └── books.service.ts
    │   └── borrow/           # Borrowing module
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

## 🛠️ Technology Stack

| Technology     | Version | Purpose                       |
| -------------- | ------- | ----------------------------- |
| **Node.js**    | 18+     | Runtime environment           |
| **TypeScript** | 5.3+    | Type-safe JavaScript          |
| **Express.js** | 4.18+   | Web framework                 |
| **MongoDB**    | 6.0+    | NoSQL database                |
| **Mongoose**   | 8.0+    | MongoDB ODM                   |
| **CORS**       | 2.8+    | Cross-origin resource sharing |
| **Helmet**     | 7.1+    | Security headers              |
| **Rate Limit** | 7.1+    | API rate limiting             |

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
https://minimal-library-management-system.vercel.app/api
```

### 📚 Book Management Endpoints

#### Create a New Book

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
  "copies": 5
}
```

#### Get All Books

```http
GET /api/books
GET /api/books?filter=SCIENCE&sort=desc&limit=5
```

**Query Parameters:**

- `filter` - Filter by genre
- `sort` - `asc` or `desc`
- `sortBy` - Field to sort by (default: `createdAt`)
- `limit` - Number of results (default: 10)

#### Get Book by ID

```http
GET /api/books/:bookId
```

#### Update Book

```http
PUT /api/books/:bookId
```

#### Delete Book

```http
DELETE /api/books/:bookId
```

### 📚 Borrowing Endpoints

#### Borrow a Book

```http
POST /api/borrow
```

**Request Body:**

```json
{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-01-15T00:00:00.000Z"
}
```

#### Get Borrowed Books Summary

```http
GET /api/borrow
```

### 🎯 Available Genres

- `FICTION`
- `NON_FICTION`
- `SCIENCE`
- `HISTORY`
- `BIOGRAPHY`
- `FANTASY`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Available Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build the project for production         |
| `npm start`          | Start production server                  |
| `npm test`           | Run test suite                           |
| `npm run test:watch` | Run tests in watch mode                  |

## 🔧 Development

### Code Structure

The project follows a modular architecture with clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data schemas and validation
- **Routes**: Define API endpoints
- **Middleware**: Handle cross-cutting concerns

### Error Handling

The API implements comprehensive error handling with:

- Custom error classes
- Global error handler middleware
- Standardized error responses
- Input validation with detailed error messages

## 🚀 Deployment

This project is deployed on **Vercel** and is accessible at:
[https://minimal-library-management-system.vercel.app/](https://minimal-library-management-system.vercel.app/)

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the powerful database
- TypeScript team for type safety
- Vercel for seamless deployment

---

⭐ **Star this repository if you find it helpful!**
