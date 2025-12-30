# ShareSpace

ShareSpace is a student-only ecommerce platform designed for students to exchange items such as textbooks, clothing, electronics, furniture, and other goods with each other. The platform facilitates peer-to-peer transactions, messaging, and networking among students on campus.

## Overview

ShareSpace provides a secure, student-verified marketplace where university students can buy, sell, and exchange items. The platform emphasizes safety, convenience, and community building by connecting students within the same university ecosystem.

## Features

### Current Features

- **Marketplace**: Browse and search items listed by students with category filtering (Textbooks, Electronics, Furniture, Clothing, etc.)
- **Upload Items**: List items for sale with images, detailed descriptions, pricing, and condition information
- **Messaging**: Real-time chat interface for students to communicate about items and transactions
- **Profile Management**: View and manage user profile, listings, sales statistics, and ratings
- **Students Nearby**: Discover and connect with students around your campus (feature in development)
- **Dark Mode**: Full light/dark theme support with persistent user preferences

### Planned Features

- Student verification system
- Proximity-based search and discovery
- Payment integration
- Rating and review system
- Authentication and authorization
- Item search and filtering enhancements
- Image upload and management

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

### Backend

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

### Architecture

The application follows a microservices architecture:

- **Student Service**: Manages student user data and profiles
- **Future Services**: Item service, messaging service, authentication service (planned)

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

### Student Entity

The current database schema includes:

- **id**: UUID (Primary Key)
- **firstName**: String (Required)
- **lastName**: String (Required)
- **email**: String (Required, Unique)
- **address**: String (Required)
- **dateOfBirth**: Date (Required)
- **registeredDate**: Date (Required)

### Planned Schema

Future entities will include:

- **Item**: For marketplace listings
- **Message**: For chat functionality
- **Transaction**: For purchase history
- **Review**: For ratings and feedback

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

## Roadmap

### Short Term

- Complete student service API endpoints
- Implement authentication and authorization
- Connect frontend to backend APIs
- Add image upload functionality
- Implement item listing and management

### Medium Term

- Build messaging service
- Implement real-time chat
- Add payment processing
- Create item service
- Implement search and filtering

### Long Term

- Student verification system
- Proximity-based features
- Mobile app development
- Advanced analytics and recommendations
- Multi-university support

## Support

For issues, questions, or contributions, please contact the development team.

## Acknowledgments

Built with Next.js, Spring Boot, and modern web technologies.
