# ShareSpace Backend API

Spring Boot monolithic backend for the ShareSpace student e-commerce platform.

## Tech Stack

- **Framework**: Spring Boot 3.4.0
- **Language**: Java 21
- **Database**: PostgreSQL (AWS RDS) / H2 (development)
- **Auth**: AWS Cognito (JWT validation)
- **File Storage**: AWS S3
- **API Docs**: SpringDoc OpenAPI (Swagger)

## Quick Start

### Development Mode (H2 Database)

```bash
cd sharespace-api

# Run with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

The API will be available at `http://localhost:4000`

- Swagger UI: `http://localhost:4000/swagger-ui.html`
- H2 Console: `http://localhost:4000/h2-console`
  - JDBC URL: `jdbc:h2:mem:sharespace`
  - Username: `sa`
  - Password: (empty)

### Production Mode (PostgreSQL + AWS)

Set the following environment variables:

```bash
DATABASE_URL=jdbc:postgresql://your-rds-endpoint:5432/sharespace
DATABASE_USER=your-username
DATABASE_PASSWORD=your-password
AWS_REGION=eu-west-2
S3_BUCKET=your-s3-bucket
COGNITO_USER_POOL_ID=your-user-pool-id
CORS_ORIGINS=https://your-frontend-domain.com
```

Then run:

```bash
./mvnw spring-boot:run
```

## Project Structure

```
sharespace-api/
├── src/main/java/com/sharespace/
│   ├── ShareSpaceApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── AwsConfig.java
│   │   └── CorsConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── ItemController.java
│   │   ├── ConversationController.java
│   │   ├── MessageController.java
│   │   ├── MentorController.java
│   │   ├── QuestionController.java
│   │   ├── AnswerController.java
│   │   ├── ReviewController.java
│   │   ├── NotificationController.java
│   │   └── ImageController.java
│   ├── service/
│   ├── repository/
│   ├── model/
│   │   └── enums/
│   └── dto/
└── src/main/resources/
    ├── application.properties
    ├── application-dev.properties
    └── data.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user after Cognito signup

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update profile
- `GET /api/users/{id}/listings` - Get user's items
- `GET /api/users/{id}/reviews` - Get reviews

### Items
- `GET /api/items` - List items (with `?category=` and `?search=`)
- `GET /api/items/{id}` - Get item details
- `POST /api/items` - Create item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item
- `PUT /api/items/{id}/status?status=` - Update status
- `POST /api/items/{id}/view` - Increment view count
- `POST /api/items/{id}/save` - Save item
- `DELETE /api/items/{id}/save` - Unsave item

### Images
- `POST /api/images/upload` - Upload images (multipart)
- `DELETE /api/images?url=` - Delete image

### Mentors
- `GET /api/mentors` - List mentors (with `?search=`)
- `GET /api/mentors/{id}` - Get mentor profile
- `POST /api/mentors` - Create mentor profile
- `PUT /api/mentors/{id}` - Update mentor profile

### Questions & Answers
- `GET /api/questions` - List questions
- `GET /api/questions/{id}` - Get question
- `POST /api/questions` - Create question
- `PUT /api/questions/{id}/status?status=` - Update status
- `GET /api/questions/{id}/answers` - Get answers
- `POST /api/questions/{id}/answers` - Post answer
- `PUT /api/answers/{id}/helpful` - Mark helpful
- `PUT /api/answers/{id}/endorse` - Endorse answer

### Conversations & Messages
- `GET /api/conversations` - List conversations
- `POST /api/conversations` - Start conversation
- `GET /api/conversations/{id}/messages` - Get messages
- `POST /api/conversations/{id}/messages` - Send message
- `PUT /api/conversations/{id}/messages/read` - Mark all as read
- `PUT /api/messages/{id}/read` - Mark as read

### Reviews
- `POST /api/users/{userId}/reviews` - Create review

### Notifications
- `GET /api/notifications` - List notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/{id}/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## AWS Setup

### RDS (PostgreSQL)
1. Create a PostgreSQL RDS instance
2. Configure security group to allow inbound from your app
3. Set the `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASSWORD` env vars

### S3
1. Create an S3 bucket for images
2. Configure CORS for your frontend domain
3. Set the `S3_BUCKET` env var
4. Ensure your EC2/ECS role has S3 read/write permissions

### Cognito
1. Create a User Pool
2. Configure app client (no secret for public apps)
3. Set the `COGNITO_USER_POOL_ID` env var
4. Frontend handles signup/login, backend validates JWTs

## Database Schema

The application uses 10 main tables:
- `users` - User accounts
- `items` - Marketplace listings
- `item_images` - Item image URLs
- `mentor_profiles` - Mentor information
- `mentor_expertise` - Mentor subjects
- `conversations` - Chat threads
- `messages` - Chat messages
- `questions` - Q&A questions
- `answers` - Q&A answers
- `reviews` - User reviews
- `notifications` - User notifications
- `saved_items` - Favorited items
