/**
 * Book CRUD API Lambda function
 */

// In-memory storage for demo purposes
// In production, you would use DynamoDB or another database
let books = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Fiction'
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        genre: 'Fiction'
    }
];

// Helper function to generate response
const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
        },
        body: JSON.stringify(body)
    };
};

// GET /books - Get all books
const getAllBooks = async () => {
    console.info('Getting all books');
    return createResponse(200, {
        message: 'Books retrieved successfully',
        data: books
    });
};

// GET /books/{id} - Get book by ID
const getBookById = async (event) => {
    const bookId = event.pathParameters?.id;
    console.info(`Getting book with ID: ${bookId}`);
    
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        return createResponse(404, {
            message: 'Book not found',
            error: `Book with ID ${bookId} does not exist`
        });
    }
    
    return createResponse(200, {
        message: 'Book retrieved successfully',
        data: book
    });
};

// POST /books - Create new book
const createBook = async (event) => {
    console.info('Creating new book');
    
    try {
        const bookData = JSON.parse(event.body);
        
        // Validate required fields
        if (!bookData.title || !bookData.author) {
            return createResponse(400, {
                message: 'Validation error',
                error: 'Title and author are required fields'
            });
        }
        
        // Generate new ID
        const newId = (books.length + 1).toString();
        
        const newBook = {
            id: newId,
            title: bookData.title,
            author: bookData.author,
            year: bookData.year || null,
            genre: bookData.genre || null
        };
        
        books.push(newBook);
        
        return createResponse(201, {
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        console.error('Error creating book:', error);
        return createResponse(400, {
            message: 'Invalid request body',
            error: 'Request body must be valid JSON'
        });
    }
};

// PUT /books/{id} - Update book
const updateBook = async (event) => {
    const bookId = event.pathParameters?.id;
    console.info(`Updating book with ID: ${bookId}`);
    
    try {
        const bookData = JSON.parse(event.body);
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex === -1) {
            return createResponse(404, {
                message: 'Book not found',
                error: `Book with ID ${bookId} does not exist`
            });
        }
        
        // Update book data
        books[bookIndex] = {
            ...books[bookIndex],
            ...bookData,
            id: bookId // Ensure ID doesn't change
        };
        
        return createResponse(200, {
            message: 'Book updated successfully',
            data: books[bookIndex]
        });
    } catch (error) {
        console.error('Error updating book:', error);
        return createResponse(400, {
            message: 'Invalid request body',
            error: 'Request body must be valid JSON'
        });
    }
};

// DELETE /books/{id} - Delete book
const deleteBook = async (event) => {
    const bookId = event.pathParameters?.id;
    console.info(`Deleting book with ID: ${bookId}`);
    
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return createResponse(404, {
            message: 'Book not found',
            error: `Book with ID ${bookId} does not exist`
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    return createResponse(200, {
        message: 'Book deleted successfully',
        data: deletedBook
    });
};

// Main handler function
exports.bookApiHandler = async (event) => {
    console.info('Book API Handler called');
    
    const httpMethod = event.httpMethod;
    const path = event.path;
    
    try {
        // Route based on HTTP method and path
        if (httpMethod === 'GET' && path === '/books') {
            return await getAllBooks();
        } else if (httpMethod === 'GET' && path.startsWith('/books/')) {
            return await getBookById(event);
        } else if (httpMethod === 'POST' && path === '/books') {
            return await createBook(event);
        } else if (httpMethod === 'PUT' && path.startsWith('/books/')) {
            return await updateBook(event);
        } else if (httpMethod === 'DELETE' && path.startsWith('/books/')) {
            return await deleteBook(event);
        } else if (httpMethod === 'OPTIONS') {
            // Handle CORS preflight requests
            return createResponse(200, {});
        } else {
            return createResponse(404, {
                message: 'Not found',
                error: 'Endpoint not found'
            });
        }
    } catch (error) {
        console.error('Error in book API handler:', error);
        return createResponse(500, {
            message: 'Internal server error',
            error: 'An unexpected error occurred'
        });
    }
}; 