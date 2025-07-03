# 🚨 Error Handling Documentation

## 📋 **Validation Error Types & Messages**

### **Book Validation Errors**

#### **Title Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required",
        "value": ""
      },
      {
        "field": "title",
        "message": "Title cannot exceed 200 characters",
        "value": "very long title..."
      }
    ],
    "statusCode": 400
  }
}
```

#### **Author Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "author",
        "message": "Author is required",
        "value": ""
      },
      {
        "field": "author",
        "message": "Author name cannot exceed 100 characters",
        "value": "very long author name..."
      }
    ],
    "statusCode": 400
  }
}
```

#### **Genre Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "genre",
        "message": "Genre is required",
        "value": ""
      },
      {
        "field": "genre",
        "message": "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
        "value": "INVALID_GENRE"
      }
    ],
    "statusCode": 400
  }
}
```

#### **ISBN Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "isbn",
        "message": "ISBN is required",
        "value": ""
      },
      {
        "field": "isbn",
        "message": "ISBN must be a valid 10 or 13 digit number",
        "value": "12345"
      }
    ],
    "statusCode": 400
  }
}
```

#### **Copies Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "copies",
        "message": "Copies is required",
        "value": ""
      },
      {
        "field": "copies",
        "message": "Copies must be a positive number",
        "value": -5
      },
      {
        "field": "copies",
        "message": "Copies must be a non-negative integer",
        "value": 3.5
      }
    ],
    "statusCode": 400
  }
}
```

#### **Description Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "description",
        "message": "Description cannot exceed 1000 characters",
        "value": "very long description..."
      }
    ],
    "statusCode": 400
  }
}
```

### **Borrow Validation Errors**

#### **Quantity Validation**

```json
{
  "message": "Quantity must be a positive number",
  "success": false,
  "error": {
    "name": "ApiError",
    "message": "Quantity must be a positive number",
    "statusCode": 400
  }
}
```

#### **Due Date Validation**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "details": [
      {
        "field": "dueDate",
        "message": "Due date is required",
        "value": ""
      },
      {
        "field": "dueDate",
        "message": "Due date must be in the future",
        "value": "2020-01-01T00:00:00.000Z"
      }
    ],
    "statusCode": 400
  }
}
```

### **ObjectId Validation Errors**

#### **Invalid Book ID Format**

```json
{
  "message": "Invalid book ID format",
  "success": false,
  "error": {
    "name": "ApiError",
    "message": "Invalid book ID format",
    "statusCode": 400
  }
}
```

#### **Cast Error (Invalid ObjectId)**

```json
{
  "message": "Invalid ID format",
  "success": false,
  "error": {
    "name": "CastError",
    "message": "Invalid ID format",
    "details": {
      "path": "_id",
      "value": "invalid-id"
    },
    "statusCode": 400
  }
}
```

### **Business Logic Errors**

#### **Book Not Found**

```json
{
  "message": "Book not found",
  "success": false,
  "error": {
    "name": "ApiError",
    "message": "Book not found",
    "statusCode": 404
  }
}
```

#### **Insufficient Copies**

```json
{
  "message": "Not enough copies available. Available: 2, Requested: 5",
  "success": false,
  "error": {
    "name": "ApiError",
    "message": "Not enough copies available. Available: 2, Requested: 5",
    "statusCode": 400
  }
}
```

#### **Duplicate ISBN**

```json
{
  "message": "Duplicate field value",
  "success": false,
  "error": {
    "name": "DuplicateError",
    "message": "Duplicate field value",
    "details": {
      "field": "isbn"
    },
    "statusCode": 409
  }
}
```

#### **Unknown Fields in Update**

```json
{
  "message": "Unknown fields: invalidField1, invalidField2",
  "success": false,
  "error": {
    "name": "ApiError",
    "message": "Unknown fields: invalidField1, invalidField2",
    "statusCode": 400
  }
}
```

---

## 🔧 **Error Response Format**

All errors follow this consistent format:

```json
{
  "message": "Error message",
  "success": false,
  "error": {
    "name": "ErrorType",
    "message": "Detailed error message",
    "details": {}, // Optional additional details
    "statusCode": 400
  }
}
```

## 📊 **HTTP Status Codes**

- **400** - Bad Request (Validation errors, invalid data)
- **404** - Not Found (Resource not found)
- **409** - Conflict (Duplicate values)
- **500** - Internal Server Error (Server errors)

## ✅ **Validation Features**

- ✅ **Schema-level validation** with detailed error messages
- ✅ **ObjectId format validation** for MongoDB IDs
- ✅ **Business logic validation** (copies availability, etc.)
- ✅ **Duplicate field detection** (ISBN uniqueness)
- ✅ **Unknown field rejection** in updates
- ✅ **Consistent error response format**
- ✅ **Proper HTTP status codes**
- ✅ **Global error handling** for all endpoints
