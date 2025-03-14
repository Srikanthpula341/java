# Task 2: Spring Boot Exception Handling

This module demonstrates implementation of exception handling in Spring Boot applications.

## Features

1. Global Exception Handler
2. Custom Exception Classes
3. Standardized Error Response Structure
4. Best Practices Implementation
5. Lombok Integration for cleaner code

## API Endpoints

### Test Exception Handling
- URL: GET /task2/test/{id}
- Description: Test endpoint to demonstrate exception handling
- Response: 
  - Success (200): Returns "Success!"
  - Error (404): Returns ErrorResponse when id = 0

## Error Response Structure 