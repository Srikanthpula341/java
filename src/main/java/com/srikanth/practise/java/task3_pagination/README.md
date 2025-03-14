# Task 3: Spring Boot Pagination & Sorting

This module demonstrates implementation of pagination and sorting in Spring Boot applications.

## Features

1. Pageable implementation with Spring Data JPA
2. Custom pagination response DTO
3. Sorting by any field
4. Category-based filtering with pagination
5. Default pagination values

## API Endpoints

### Get All Products (Paginated)
- URL: GET /task3/products
- Parameters:
  - pageNo (default: 0)
  - pageSize (default: 10)
  - sortBy (default: "id")
  - sortDir (default: "asc")

### Get Products by Category (Paginated)
- URL: GET /task3/products/category/{category}
- Parameters:
  - pageNo (default: 0)
  - pageSize (default: 10)

## Response Format 