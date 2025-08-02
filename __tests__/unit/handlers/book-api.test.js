// Import bookApiHandler function from book-api.js
const { bookApiHandler } = require('../../../src/handlers/book-api.js');

// This includes all tests for bookApiHandler()
describe('Test for book-api', function () {
    
    // Test GET /books - Get all books
    it('Should get all books successfully', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/books'
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Books retrieved successfully');
        expect(JSON.parse(result.body).data).toBeInstanceOf(Array);
        expect(JSON.parse(result.body).data.length).toBeGreaterThan(0);
    });

    // Test GET /books/{id} - Get book by ID
    it('Should get book by ID successfully', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/books/1',
            pathParameters: { id: '1' }
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Book retrieved successfully');
        expect(JSON.parse(result.body).data.id).toBe('1');
    });

    // Test GET /books/{id} - Book not found
    it('Should return 404 for non-existent book', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/books/999',
            pathParameters: { id: '999' }
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Book not found');
    });

    // Test POST /books - Create new book
    it('Should create new book successfully', async () => {
        const newBook = {
            title: 'Test Book',
            author: 'Test Author',
            year: 2024,
            genre: 'Test'
        };
        
        const event = {
            httpMethod: 'POST',
            path: '/books',
            body: JSON.stringify(newBook)
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body).message).toBe('Book created successfully');
        expect(JSON.parse(result.body).data.title).toBe(newBook.title);
        expect(JSON.parse(result.body).data.author).toBe(newBook.author);
    });

    // Test POST /books - Validation error
    it('Should return 400 for missing required fields', async () => {
        const invalidBook = {
            title: 'Test Book'
            // Missing author
        };
        
        const event = {
            httpMethod: 'POST',
            path: '/books',
            body: JSON.stringify(invalidBook)
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body).message).toBe('Validation error');
    });

    // Test PUT /books/{id} - Update book
    it('Should update book successfully', async () => {
        const updateData = {
            title: 'Updated Book Title',
            year: 2025
        };
        
        const event = {
            httpMethod: 'PUT',
            path: '/books/1',
            pathParameters: { id: '1' },
            body: JSON.stringify(updateData)
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Book updated successfully');
        expect(JSON.parse(result.body).data.title).toBe(updateData.title);
        expect(JSON.parse(result.body).data.year).toBe(updateData.year);
    });

    // Test PUT /books/{id} - Book not found
    it('Should return 404 when updating non-existent book', async () => {
        const updateData = {
            title: 'Updated Book Title'
        };
        
        const event = {
            httpMethod: 'PUT',
            path: '/books/999',
            pathParameters: { id: '999' },
            body: JSON.stringify(updateData)
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Book not found');
    });

    // Test DELETE /books/{id} - Delete book
    it('Should delete book successfully', async () => {
        const event = {
            httpMethod: 'DELETE',
            path: '/books/2',
            pathParameters: { id: '2' }
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Book deleted successfully');
        expect(JSON.parse(result.body).data.id).toBe('2');
    });

    // Test DELETE /books/{id} - Book not found
    it('Should return 404 when deleting non-existent book', async () => {
        const event = {
            httpMethod: 'DELETE',
            path: '/books/999',
            pathParameters: { id: '999' }
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Book not found');
    });

    // Test OPTIONS - CORS preflight
    it('Should handle OPTIONS request for CORS', async () => {
        const event = {
            httpMethod: 'OPTIONS',
            path: '/books'
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(200);
        expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
        expect(result.headers['Access-Control-Allow-Methods']).toBe('GET,POST,PUT,DELETE,OPTIONS');
    });

    // Test 404 for unknown endpoint
    it('Should return 404 for unknown endpoint', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/unknown'
        };
        
        const result = await bookApiHandler(event);
        
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Not found');
    });
}); 