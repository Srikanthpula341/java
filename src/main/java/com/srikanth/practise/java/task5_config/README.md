# Task 5: Spring Boot Configuration Properties

This module demonstrates the implementation of configuration properties in Spring Boot applications.

## Features

1. Type-safe Configuration Properties
2. YAML Configuration
3. Nested Properties
4. Environment-specific Configuration
5. Default Values
6. Property Validation

## Configuration Structure

### Application Info
- name
- description
- version

### Email Settings
- from
- supportEmail
- enabled
- maxRetries

### Security Settings
- apiKey
- tokenValidityInSeconds
- sslEnabled
- CORS Configuration
  - enabled
  - allowedOrigins
  - allowedMethods

### Cache Settings
- enabled
- timeoutInSeconds
- maxSize

## API Endpoints

### Get Configuration
- URL: GET /task5/config
- Description: Returns non-sensitive configuration values
- Response: JSON object containing configuration properties

## Implementation Steps

1. Create ApplicationProperties class with @ConfigurationProperties
2. Define nested configuration classes for Email, Security, and Cache
3. Create ConfigurationService to manage property access
4. Implement ConfigController to expose configurations via REST API
5. Configure application.yml with property values

## Testing

1. Start the application
2. Access /task5/config endpoint
3. Verify configuration values are correctly loaded
4. Test environment-specific configurations
5. Validate property overrides work correctly

## Best Practices

1. Use type-safe configuration properties
2. Keep sensitive data in environment variables
3. Provide meaningful default values
4. Document all configuration properties
5. Use validation constraints where appropriate

## Usage

1. Application Properties 