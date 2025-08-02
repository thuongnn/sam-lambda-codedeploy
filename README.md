# SAM Lambda CodeDeploy with Book CRUD API

This project demonstrates a Serverless Application Model (SAM) Lambda function with a complete CRUD API for managing books.

## Features

- **Book CRUD API**: Complete Create, Read, Update, Delete operations for books
- **RESTful Endpoints**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Required field validation for book creation
- **Error Handling**: Proper HTTP status codes and error messages
- **Testing**: Comprehensive test suite for all API endpoints

## API Endpoints

### Books API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/{id}` | Get book by ID |
| POST | `/books` | Create new book |
| PUT | `/books/{id}` | Update book by ID |
| DELETE | `/books/{id}` | Delete book by ID |
| OPTIONS | `/books` | CORS preflight request |

### Book Object Structure

```json
{
  "id": "string",
  "title": "string (required)",
  "author": "string (required)",
  "year": "number (optional)",
  "genre": "string (optional)"
}
```

## Prerequisites

- AWS CLI configured
- SAM CLI installed
- Node.js 22.x or later
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Run Tests

```bash
npm test
```

### Local Development

Start the API locally:
```bash
npm run local
```

This will start the API Gateway locally at `http://localhost:3000`

### Build and Deploy

Build the application:
```bash
npm run build
```

Deploy to AWS:
```bash
npm run deploy
```

## API Usage Examples

### Get All Books
```bash
curl -X GET http://localhost:3000/books
```

### Get Book by ID
```bash
curl -X GET http://localhost:3000/books/1
```

### Create New Book
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "year": 1937,
    "genre": "Fantasy"
  }'
```

### Update Book
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Book Title",
    "year": 2024
  }'
```

### Delete Book
```bash
curl -X DELETE http://localhost:3000/books/1
```

## Project Structure

```
sam-lambda-codedeploy/
├── src/
│   └── handlers/
│       └── book-api.js              # Book CRUD API handler
├── __tests__/
│   └── unit/
│       └── handlers/
│           └── book-api.test.js
├── template.yaml                    # SAM template
├── package.json                     # Dependencies and scripts
└── README.md                       # This file
```

## Configuration

The application uses in-memory storage for demonstration purposes. In production, you should:

1. Add DynamoDB table for persistent storage
2. Implement proper authentication and authorization
3. Add input sanitization and validation
4. Configure proper logging and monitoring
5. Set up CI/CD pipeline

## License

This project is licensed under the MIT License.
