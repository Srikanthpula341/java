# Task 4: Spring Boot Validation

This module demonstrates implementation of request validation in Spring Boot applications.

## Features

1. Bean Validation (JSR-380)
2. Custom validation messages
3. DTO validation
4. Entity validation
5. Error handling for validation failures

## API Endpoints

### Register User
- URL: POST /task4/users
- Validates:
  - Name (2-50 characters)
  - Email (valid format)
  - Password (8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)
  - Age (18-100)
  - Phone (valid format)

### Get User
- URL: GET /task4/users/{id}
- Validates:
  - ID must exist in database

## Validation Rules

### Name
- Not blank
- Length: 2-50 characters

### Email
- Not blank
- Valid email format
- Unique in database

### Password
- Not blank
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

### Age
- Minimum: 18
- Maximum: 100

### Phone
- Valid international phone number format

## Testing
1. Start the application
2. Try registering users with invalid data to test validations
3. Try registering users with valid data
4. Try retrieving non-existent users 