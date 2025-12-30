# ShareSpace

ShareSpace is a cloud-based, campus-focused student ecommerce and social platform that enables students to exchange second-hand items including textbooks, lecture notes, revision packs, and electronics within their campus community. The platform combines transactional commerce with a social mentorship layer, where senior students, course representatives, teaching assistants, and alumni can create profiles, answer academic queries, endorse sellers, and share recommended resources.

## Overview

ShareSpace addresses the unique needs of campus communities by providing a localized, student-centric marketplace optimized for academic calendars, course categorization, and institutional identity verification. Unlike traditional global ecommerce platforms, ShareSpace is designed specifically for the campus context, addressing tight student budgets, short item lifecycles driven by graduation turnover, and safety concerns when arranging local pickups.

The platform extends beyond simple buying and selling by integrating a mentorship system that combines transactional commerce with academic assistance and social endorsement. This approach increases purchase confidence through peer recommendations while providing valuable learning support, demonstrating practical implementation of distributed systems, fault tolerance, and scalable cloud architectures.

## Problem & Motivation

Traditional global ecommerce platforms inadequately serve the unique campus context. Students face tight budgets, short item lifecycles driven by graduation turnover, coupled with safety and verification concerns when arranging meetings with strangers for local pickup. Campus communities experience supply-demand gaps where seniors have resources incoming students need, yet global platforms do not optimize for this local exchange.

Existing solutions lack academic-calendar awareness, course categorization, and institutional identity verification. Students also need help finding trustworthy sellers and reliable academic resources. ShareSpace addresses these challenges by creating a university marketplace with identity-tied access controls and an integrated social mentorship aspect, reducing student costs through affordable second-hand resources, increasing transaction trust through social ratings, and promoting environmentally sustainable reuse within campus boundaries.

## Features

### Current Features

- **Marketplace**: Browse and search items listed by students with category filtering (Textbooks, Electronics, Furniture, Clothing, etc.)
- **Upload Items**: List items for sale with images, detailed descriptions, pricing, and condition information
- **Messaging**: Real-time chat interface for students to communicate about items and transactions
- **Profile Management**: View and manage user profile, listings, sales statistics, and ratings
- **Students Nearby**: Discover and connect with students around your campus (feature in development)
- **Dark Mode**: Full light/dark theme support with persistent user preferences

### Planned Features

- **Mentor Profiles**: Senior students, TAs, and alumni can create mentor profiles with expertise areas
- **Q&A System**: Students can ask academic and student-life questions, mentors provide answers
- **Mentor Endorsements**: Social endorsement system where mentors can endorse sellers and recommend items
- **Mentor Recommendations**: Display mentor picks and recommendations on item listings
- **University Email Verification**: AWS Cognito integration for university email-based registration and verification
- **Course-Aware Categorization**: Items categorized by course codes and academic subjects
- **Academic Calendar Integration**: Awareness of semester cycles and graduation turnover
- **Contactless Pickup Arrangements**: Safe, local pickup coordination within campus
- **Rating and Review System**: Transaction-based reviews and ratings
- **Analytics Dashboard**: Real-time metrics on listings, transactions, and platform usage
- **Event Logging**: Comprehensive tracking of user interactions for research and optimization

## Tech Stack

### Frontend

- **Framework**: Next.js 16.0.7
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: HeroUI (React)
- **Icons**: Tabler Icons React
- **Theme Management**: next-themes
- **Package Manager**: pnpm
- **Bundler**: Turbopack (for development and build)

### Backend (Current - Spring Boot)

- **Framework**: Spring Boot 3.4.0
- **Language**: Java 21
- **Database**:
  - PostgreSQL (production)
  - H2 (development/testing)
- **ORM**: Spring Data JPA / Hibernate
- **API Documentation**: SpringDoc OpenAPI (Swagger)
- **Build Tool**: Maven
- **Inter-Service Communication**: gRPC
- **Message Queue**: Apache Kafka
- **Validation**: Jakarta Validation

### Backend (Planned - AWS Serverless)

- **Compute**: AWS Lambda serverless functions for scalable, cost-effective compute
- **API Gateway**: AWS API Gateway for RESTful endpoints with throttling and authentication
- **Authentication**: AWS Cognito for user authentication, university email verification, and token management
- **Data Storage**: AWS DynamoDB for NoSQL database with automatic scaling
- **File Storage**: AWS S3 for item images and static assets with CloudFront CDN
- **Analytics**: Amazon QuickSight for real-time dashboards and metrics
- **Monitoring**: AWS CloudWatch for system health, performance, and custom metrics
- **Security**: AWS IAM for least-privilege access control and RBAC

### Architecture

The application follows a microservices architecture, transitioning from Spring Boot to AWS serverless:

**Current Architecture (Development)**:

- **Student Service**: Manages student user data and profiles (Spring Boot)
- **Future Services**: Item service, messaging service, mentor service, authentication service

**Planned Architecture (Production)**:

- **Serverless Microservices**: Lambda functions for each service domain
- **Event-Driven Communication**: Kafka for asynchronous messaging between services
- **Distributed Storage**: DynamoDB tables with Global Secondary Indexes for flexible querying
- **Elastic Scaling**: Auto-scaling Lambda functions and DynamoDB capacity
- **Fault Tolerance**: AWS managed services with built-in redundancy and failover

This architecture demonstrates practical implementation of cloud computing concepts including Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS), elasticity through auto-scaling, distributed cloud storage systems, and serverless computing.

## Project Structure

```
sharespace/
├── frontend/                    # Next.js frontend application
│   ├── app/                    # Next.js app directory
│   │   ├── (main)/            # Main route group
│   │   │   ├── marketplace/   # Marketplace page
│   │   │   ├── upload/        # Upload item page
│   │   │   ├── messages/      # Messaging interface
│   │   │   ├── students-nearby/ # Students discovery page
│   │   │   └── profile/       # User profile page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects to marketplace)
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── contexts/         # React contexts (ThemeContext)
│   │   ├── providers/        # Client-side providers
│   │   ├── ItemCard.tsx      # Marketplace item card component
│   │   └── Navbar.tsx         # Navigation bar component
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── tailwind.config.ts    # Tailwind configuration
│
├── backend/                   # Backend services
│   └── student-service/      # Student microservice
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/sharespace/studentservice/
│       │   │   │       ├── controller/    # REST controllers
│       │   │   │       ├── dto/          # Data Transfer Objects
│       │   │   │       ├── mapper/       # Entity-DTO mappers
│       │   │   │       ├── model/        # JPA entities
│       │   │   │       ├── repository/   # Data repositories
│       │   │   │       ├── service/      # Business logic
│       │   │   │       └── StudentServiceApplication.java
│       │   │   └── resources/
│       │   │       ├── application.properties  # Configuration
│       │   │       └── data.sql          # Initial data
│       │   └── test/         # Unit tests
│       └── pom.xml           # Maven dependencies
│
├── ai-guidance/              # Project documentation
│   ├── project-structure.md  # Detailed project structure
│   └── changelog.md          # Development history
│
└── package.json              # Root scripts
```

## Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (install via `npm install -g pnpm`)
- **Java**: JDK 21 or higher
- **Maven**: Version 3.6 or higher
- **PostgreSQL**: Version 12 or higher (for production)
- **Docker** (optional): For containerized development

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend service directory:

```bash
cd backend/student-service
```

2. Ensure PostgreSQL is running (or use H2 for development as configured)

3. Build the project:

```bash
./mvnw clean install
```

4. Run the application:

```bash
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:4000`

5. Access the H2 console (development only):

   - URL: `http://localhost:4000/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `admin_viewer`
   - Password: `password`

6. Access API documentation:
   - Swagger UI: `http://localhost:4000/swagger-ui.html`

### Running from Root

The root `package.json` provides convenience scripts:

```bash
# Start frontend development server
pnpm dev

# Build frontend for production
pnpm build

# Start frontend production server
pnpm start

# Run linting
pnpm lint
```

## Configuration

### Frontend Configuration

Frontend configuration is managed through:

- `frontend/next.config.ts`: Next.js configuration
- `frontend/tailwind.config.ts`: Tailwind CSS configuration
- `frontend/tsconfig.json`: TypeScript configuration

### Backend Configuration

Backend configuration is managed through:

- `backend/student-service/src/main/resources/application.properties`: Spring Boot configuration

Key configuration properties:

- Server port: `4000`
- Database: H2 in-memory (development) or PostgreSQL (production)
- JPA: Auto-update schema mode enabled

## Database Schema

### Current Schema (PostgreSQL/H2)

**Student Entity**:

- **id**: UUID (Primary Key)
- **firstName**: String (Required)
- **lastName**: String (Required)
- **email**: String (Required, Unique, University Email)
- **address**: String (Required)
- **dateOfBirth**: Date (Required)
- **registeredDate**: Date (Required)

### Planned Schema

**Student Entity Extensions**:

- **university**: String (Required)
- **studentId**: String (University Student ID)
- **course/major**: String
- **yearOfStudy**: Integer
- **bio**: String
- **verificationStatus**: Enum (PENDING, VERIFIED, REJECTED)
- **mentorStatus**: Boolean
- **rating**: Double

**Item Entity**:

- **id**: UUID (Primary Key)
- **title**: String (Required)
- **description**: String
- **category**: Enum (TEXTBOOK, NOTES, ELECTRONICS, FURNITURE, CLOTHING, OTHER)
- **condition**: Enum (NEW, LIKE_NEW, GOOD, FAIR, POOR)
- **price**: BigDecimal (Required)
- **sellerId**: UUID (Foreign Key to Student)
- **images**: List<String> (S3 URLs)
- **status**: Enum (ACTIVE, SOLD, REMOVED)
- **courseCode**: String (Optional, for course-specific items)
- **university**: String (Required)
- **createdAt**: LocalDateTime
- **views**: Integer
- **saves**: Integer

**Message Entity**:

- **id**: UUID (Primary Key)
- **conversationId**: UUID
- **senderId**: UUID (Foreign Key to Student)
- **receiverId**: UUID (Foreign Key to Student)
- **content**: String (Required)
- **itemId**: UUID (Optional, Foreign Key to Item)
- **sentAt**: LocalDateTime
- **readAt**: LocalDateTime (Nullable)

**Transaction Entity**:

- **id**: UUID (Primary Key)
- **itemId**: UUID (Foreign Key to Item)
- **buyerId**: UUID (Foreign Key to Student)
- **sellerId**: UUID (Foreign Key to Student)
- **price**: BigDecimal
- **status**: Enum (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- **pickupLocation**: String
- **pickupTime**: LocalDateTime

**MentorProfile Entity**:

- **id**: UUID (Primary Key)
- **studentId**: UUID (Foreign Key to Student, Unique)
- **bio**: String
- **expertise**: List<String> (Courses/Subjects)
- **endorsements**: Integer
- **rating**: Double
- **totalAnswers**: Integer
- **helpfulAnswers**: Integer
- **verified**: Boolean

**Question Entity**:

- **id**: UUID (Primary Key)
- **title**: String (Required)
- **content**: String (Required)
- **askerId**: UUID (Foreign Key to Student)
- **category**: Enum (ACADEMIC, STUDENT_LIFE, COURSE_ADVICE, TEXTBOOK_RECOMMENDATION)
- **courseCode**: String (Optional)
- **status**: Enum (OPEN, ANSWERED, CLOSED)

**Answer Entity**:

- **id**: UUID (Primary Key)
- **questionId**: UUID (Foreign Key to Question)
- **mentorId**: UUID (Foreign Key to Student)
- **content**: String (Required)
- **helpfulCount**: Integer
- **isEndorsed**: Boolean

**Review Entity**:

- **id**: UUID (Primary Key)
- **transactionId**: UUID (Foreign Key to Transaction)
- **reviewerId**: UUID (Foreign Key to Student)
- **revieweeId**: UUID (Foreign Key to Student)
- **rating**: Integer (1-5)
- **comment**: String (Optional)

### Planned DynamoDB Schema (AWS Migration)

The migration to AWS will involve converting relational schema to DynamoDB tables with appropriate partition keys, sort keys, and Global Secondary Indexes for efficient querying patterns.

## API Endpoints

### Student Service

The student service currently provides endpoints for student management. Full API documentation is available via Swagger UI when the backend is running.

## Development

### Frontend Development

- Uses Turbopack for fast development builds
- Server components by default (Next.js App Router)
- Client components only when needed (interactivity, hooks)
- Mobile-first responsive design
- Dark mode support via ThemeContext

### Backend Development

- Follows Spring Boot best practices
- Layered architecture: Controller → Service → Repository
- DTO pattern for API responses
- JPA for database operations
- gRPC for inter-service communication (configured)
- Kafka for event-driven messaging (configured)

## Design System

### Colors

- **Primary**: Dark red (#991b1b / red-800) - Light mode
- **Primary**: Dark red (#b91c1c / red-700) - Dark mode
- **Background**: White (#FFFFFF) - Light mode
- **Background**: Black (#000000) - Dark mode

### Typography

- **Primary Font**: Instrument Sans (Google Fonts)
- **Secondary Font**: Instrument Serif (Google Fonts)

### Components

- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows
- Clean, minimal design
- Student-friendly aesthetic

## Testing

### Frontend Testing

Testing setup is configured but tests are not yet implemented.

### Backend Testing

- Unit tests: `src/test/java`
- Test framework: JUnit 5
- Run tests: `./mvnw test`

## Deployment

### Frontend Deployment

The frontend can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting service

Build command: `pnpm build`
Start command: `pnpm start`

### Backend Deployment

The backend can be deployed to:

- AWS Elastic Beanstalk
- Google Cloud Run
- Azure App Service
- Docker containers
- Kubernetes clusters

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## License

This project is private and proprietary.

## Beneficiaries

**Undergraduate and Postgraduate Students**: Gain cheaper access to second-hand textbooks, lecture notes, and essential equipment. Benefit from faster discovery of course-relevant materials through mentor recommendations and easier peer-to-peer exchange with reduced friction and enhanced safety.

**Senior Students and Alumni**: Gain a marketplace to sell campus items, earn supplementary income, and build reputation as helpful mentors. Mentor status serves as valuable social capital, volunteering experience, and CV enhancement through demonstrable community leadership.

**University Services and Sustainability Offices**: Benefit from reduced campus waste and an observable reuse channel supporting institutional sustainability goals. The platform provides quantifiable metrics on circular economy impacts within the campus ecosystem.

**Course Teams and Teaching Assistants**: Gain a formal mentor channel that reduces repeated questions during lectures and tutorials, helping route students to useful resources and experienced peer mentors rather than overburdening staff.

## Cloud Computing Learning Outcomes

This project demonstrates practical implementation of cloud computing concepts aligned with academic learning outcomes:

- **Infrastructure-as-a-Service (IaaS)**: Utilization of AWS compute, storage, and networking resources
- **Platform-as-a-Service (PaaS)**: Leveraging AWS managed services (Lambda, DynamoDB, Cognito)
- **Serverless Computing**: Event-driven Lambda functions without server management
- **Elasticity**: Auto-scaling capabilities of Lambda and DynamoDB
- **Distributed Cloud Storage**: S3 for object storage, DynamoDB for NoSQL database
- **Fault Tolerance**: AWS managed services with built-in redundancy
- **Resource Management**: Cost optimization through serverless architecture and pay-per-use model

## Roadmap

### Phase 1: MVP Implementation (Current)

- Complete student service API endpoints
- Implement basic authentication with AWS Cognito
- Connect frontend to backend APIs
- Add image upload functionality with S3
- Implement item listing and management
- Build messaging service
- Implement real-time chat

### Phase 2: Mentor Features

- Create mentor profile system
- Implement Q&A functionality
- Build endorsement mechanism
- Add mentor recommendations to item listings
- Create mentor leaderboard

### Phase 3: AWS Migration

- Migrate Spring Boot services to AWS Lambda
- Set up API Gateway
- Migrate PostgreSQL to DynamoDB
- Configure S3 and CloudFront
- Set up CloudWatch monitoring
- Implement QuickSight dashboards

### Phase 4: Advanced Features

- Implement comprehensive search and filtering
- Add transaction and review system
- Build notification service
- Implement event logging and analytics
- Add A/B testing framework

### Phase 5: Research & Evaluation

- Conduct user studies
- Gather qualitative insights through surveys and interviews
- Measure trust perceptions and user experience quality
- Analyze platform usage metrics
- Evaluate mentor endorsement effectiveness

### Long Term

- Multi-university support
- Mobile app development
- Advanced recommendation algorithms
- Integration with university systems
- Payment processing integration

## Support

For issues, questions, or contributions, please contact the development team.

## Research Context

This project is designed, implemented, and evaluated as part of a research study on campus-focused student ecommerce platforms. The architecture and core design principles follow a localized, student-centric approach while extending the concept with enhanced cloud-native features including serverless computing, real-time analytics, and scalable data management using AWS infrastructure.

The platform incorporates comprehensive event logging capturing listing views, user messages, item saves, purchase transactions, and completion confirmations. A/B testing evaluates reputation display variations and social proof mechanisms, measuring outcomes including message volume and user-reported trust scores.

## Acknowledgments

Built with Next.js, Spring Boot, AWS serverless technologies, and modern cloud computing practices. This project demonstrates practical implementation of distributed systems, fault tolerance, and scalable cloud architectures.
