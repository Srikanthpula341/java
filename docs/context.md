# Spring Boot Learning Tasks Documentation

## Task 1: Spring Boot CRUD API
**Package**: `task1_crud`
**Base URL**: `/task1`
- Implementation of basic CRUD operations
- Entity design and relationships
- Repository layer implementation
- Service layer business logic
- REST controller endpoints
- Documentation & Testing

## Task 2: Spring Boot Exception Handling
**Package**: `task2_exception`
**Base URL**: `/task2`
- Global exception handling setup
- Custom exceptions
- Error response structure
- Exception handling best practices
- Documentation & Testing examples

## Task 3: Spring Boot Pagination & Sorting
**Package**: `task3_pagination`
**Base URL**: `/task3`
- Pageable implementation
- Sorting configurations
- Custom page responses
- API documentation with examples
- Performance considerations

## Task 4: Spring Boot Validation
**Package**: `task4_validation`
- Request validation implementation
- Custom validation annotations
- Validation groups
- Error message handling
- Documentation with examples

## Task 5: Spring Boot Configuration Properties
**Package**: `task5_config`
- YAML configuration setup
- Custom property classes
- Configuration management
- Environment-specific configs
- Documentation & Usage examples

## Task 6: Spring Boot Security with JWT
**Package**: `task6_jwt`
- JWT implementation
- Authentication flow
- Token management
- Security configurations
- API documentation & Testing

## Task 7: Spring Boot OAuth2 Authentication
**Package**: `task7_oauth`
- Google OAuth2 setup
- Authentication flow
- User registration process
- Security configurations
- Documentation & Examples

## Task 8: Role-Based Access Control
**Package**: `task8_rbac`
- Role management
- Permission setup
- Access control implementation
- Security configurations
- Documentation & Testing

## Task 9: Spring Boot Session Management
**Package**: `task9_session`
- Redis session setup
- Session management
- Security configurations
- Best practices
- Documentation & Examples

## Task 10: Database Authentication
**Package**: `task10_db_auth`
- Database schema design
- Authentication implementation
- Password encryption
- Security best practices
- Documentation & Testing

## Task 11: Feign Client Implementation
**Package**: `task11_feign`
- Feign client setup
- API integration
- Error handling
- Configuration
- Documentation & Examples

## Task 12: WebSockets Chat Application
**Package**: `task12_websocket`
- WebSocket configuration
- Chat functionality
- Message handling
- Client implementation
- Documentation & Testing

## Task 13: Kafka Implementation
**Package**: `task13_kafka`
- Kafka setup
- Producer implementation
- Consumer implementation
- Error handling
- Documentation & Examples

## Task 14: RabbitMQ Integration
**Package**: `task14_rabbitmq`
- RabbitMQ setup
- Queue management
- Message handling
- Error handling
- Documentation & Testing

## Task 15: OpenFeign Implementation
**Package**: `task15_openfeign`
- OpenFeign setup
- API integration
- Error handling
- Configuration
- Documentation & Examples

## Task 16: One-to-Many Relationship
**Package**: `task16_onetomany`
- Entity relationships
- Database design
- CRUD operations
- Best practices
- Documentation & Examples

## Task 17: Many-to-Many Relationship
**Package**: `task17_manytomany`
- Entity relationships
- Database design
- CRUD operations
- Best practices
- Documentation & Examples

## Task 18: Redis Caching
**Package**: `task18_redis`
- Redis setup
- Cache configuration
- Cache management
- Performance testing
- Documentation & Examples

## Task 19: Database Connection Pooling
**Package**: `task19_connection_pool`
- HikariCP setup
- Pool configuration
- Performance tuning
- Monitoring
- Documentation & Examples

## Task 20: Database Migration
**Package**: `task20_migration`
- Flyway/Liquibase setup
- Migration scripts
- Version management
- Best practices
- Documentation & Examples

## Task 21: Testing Implementation
**Package**: `task21_testing`
- Unit tests
- Integration tests
- Test configurations
- Mockito usage
- Documentation & Examples

## Task 22: TestContainers
**Package**: `task22_testcontainers`
- Container setup
- Database testing
- Integration testing
- Best practices
- Documentation & Examples

## Task 23: Actuator & Health Checks
**Package**: `task23_actuator`
- Actuator setup
- Custom endpoints
- Health indicators
- Monitoring
- Documentation & Examples

## Task 24: Logging Implementation
**Package**: `task24_logging`
- Logback configuration
- SLF4J implementation
- Log management
- Best practices
- Documentation & Examples

## Task 25: Metrics Implementation
**Package**: `task25_metrics`
**Base URL**: `/task25`
- Prometheus setup
- Grafana integration
- Metrics collection
- Dashboard setup
- Documentation & Examples

---

Each task package includes:
1. Complete source code
2. Documentation folder with:
   - README.md (Overview & Setup)
   - workflow.md (Implementation steps)
   - api-docs.md (API documentation)
   - Additional task-specific documentation

## API Structure
- Each task has its own base URL (e.g., `/task1`, `/task2`, etc.)
- All API endpoints for a specific task are grouped under its base URL
- Base URLs are defined in `ApiConstants.java`
- Consistent URL pattern across all tasks for better organization
