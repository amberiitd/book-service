# Books API

The Books API provides endpoints for retrieving a list of books based on search criteria. This document outlines the features, usage, and implementation details.

## Features

- **Search Books**: Retrieve a list of books based on various criteria such as title, author, published date, and genre.
- **Sorting**: Sort the results by title, author, or publication date.
- **Pagination**: Navigate through the result set with pagination support.
- **Authentication**: Secure access to the API using JWT authentication.
- **Database Indexing**: Optimize database queries with indexing on relevant columns.
- **Caching**: Improve performance by caching query results in memory.

## Swagger Documentation

Explore the API interactively using Swagger documentation. Swagger provides a user-friendly interface to understand the API endpoints, parameters, and response formats.

To access Swagger documentation, run the API and visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.


## Endpoints

### GET /books

Retrieve a list of books based on the provided search criteria.

**Query Parameters:**

- `title` (optional): Partial or full title of the book.
- `author` (optional): Partial or full name of the author.
- `publishedYearStart` (optional): Start of the published date range.
- `publishedYearEnd` (optional): End of the published date range.
- `genre` (optional): Genre of the book.
- `sortBy` (optional): Sort the results by title, author, or publication date.
- `sortOrder` (optional): Sort order (asc or desc).
- `page` (optional): Page number for pagination.
- `size` (optional): Number of items per page for pagination.
- `availability` (optional): Filter by availability (true or false).

**Example Request:**

```bash
curl -X GET "http://localhost:3000/books?title=javascript&sortBy=title&sortOrder=asc&page=1&size=10" -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example Request:**
```
[
  {
    "id": 1,
    "title": "JavaScript: The Good Parts",
    "author": "Douglas Crockford",
    "publishedDate": "2008-05-30",
    "genre": "Programming",
    "availability": true
    // ... other book details
  },
  // ... more books
]
```

## Authentication

The `/books` API requires authentication using a JSON Web Token (JWT). Include the JWT token in the `Authorization` header of your requests.

## Database Indexing

To optimize database queries, relevant columns in the books table have been indexed. Indexing is applied to columns frequently used in search and filtering operations.

## Caching

The API implements caching for the `GET /books` endpoint using the `memory-cache` library. Query results are stored in memory for a specified duration to improve performance and reduce database load.


## Setup

1. Clone the repository:
  ```
  git clone https://github.com/amberiitd/book-service.git
  ```

2. Install dependencies:
  ```
  cd books-api
  npm install
  ```
3. Include follwing environment variable in your `.env` file:
  1. DB_HOST
  2. DB_USER
  3. DB_PASSWORD
  4. DB_DATABASE
  5. JWT_SECRET_KEY
  6. SERVER_PORT

4. Login to your `mysql` shell and run the sql script `src/data/book.sql` using `source src/data/book.sql`.
5. Start the server:
  ```npm start```