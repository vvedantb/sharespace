# ShareSpace

A cloud-native student marketplace and mentorship platform for campus communities. ShareSpace enables students to buy and sell second-hand items while connecting through a social mentorship layer where senior students and alumni provide academic guidance.

## Features

### Marketplace

- **Browse & Search**: Filter items by category, price range, course code with multiple sort options
- **Item Listings**: Create listings with multiple images, descriptions, pricing, and condition ratings
- **Save Items**: Favorite items and view them later in your saved collection
- **View Tracking**: Automatic view counting for marketplace analytics
- **Mark as Sold**: Track transactions and mark items when sold

### Mentorship System

- **Mentor Applications**: Students (Year 3+) and alumni can apply to become mentors
- **Admin Review**: Mentor applications go through admin approval workflow
- **Mentor Directory**: Browse approved mentors with search and expertise filtering
- **Endorsements**: Users can endorse helpful mentors
- **Leaderboard**: Rankings based on endorsements and helpful answers

### Q&A System

- **Ask Questions**: Post academic and student-life questions with category tagging
- **Course Codes**: Filter questions by course code
- **Mentor Answers**: Verified mentors provide answers
- **Best Answers**: Mark helpful answers and select best answer
- **Trending Questions**: View popular questions from the last 7 days

### Messaging

- **Direct Messages**: Chat with sellers and buyers about items
- **Conversation History**: Full message history per conversation
- **Read Receipts**: Track unread messages

### Reviews & Ratings

- **Transaction Reviews**: Leave reviews after purchases
- **Seller Ratings**: View aggregated ratings on seller profiles
- **Review Display**: Reviews shown on item and profile pages

### Notifications

- **Real-time Alerts**: Notifications for messages, sales, answers, endorsements, and reviews
- **Unread Counter**: Badge showing unread notification count
- **Mark as Read**: Individual and bulk read actions

### Gamification

- **Points System**: Earn points for listing items, making sales, asking questions, and helping others
- **Badges**: Unlock badges in seller, buyer, mentor, and community categories
- **Profile Display**: Show earned badges and total points on profile

### Sustainability Tracking

- **Money Saved**: Calculate savings vs retail based on item condition
- **CO2 Impact**: Estimate environmental impact by reusing items
- **Dashboard Stats**: View personal sustainability metrics

### Admin Panel

- **Mentor Applications**: Review and approve/reject mentor applications
- **Reports**: Handle user reports on items and users
- **Moderation**: Manage flagged content

### Additional Features

- **Dark Mode**: Full light/dark theme support with persistent preferences
- **Responsive Design**: Mobile-first design that works on all devices
- **Profile Onboarding**: Guided setup for new users

## Tech Stack

| Technology      | Version | Purpose                         |
| --------------- | ------- | ------------------------------- |
| Next.js         | 16.0.7  | React framework with App Router |
| React           | 19.2.0  | UI library                      |
| TypeScript      | 5       | Type-safe JavaScript            |
| Tailwind CSS    | 3.4.17  | Utility-first styling           |
| HeroUI          | -       | Component library               |
| Prisma          | 6.19.1  | Database ORM                    |
| TanStack Query  | -       | Data fetching and caching       |
| React Hook Form | -       | Form handling                   |
| Zod             | -       | Schema validation               |
| Tabler Icons    | -       | Icon library                    |
| next-themes     | -       | Theme management                |
| Turbopack       | -       | Dev server and bundler          |
| PostgreSQL      | 12+     | Production database             |

### Cloud Services (AWS)

| Service | Purpose                            |
| ------- | ---------------------------------- |
| Cognito | Authentication and user management |
| S3      | Image storage                      |
| RDS     | PostgreSQL hosting                 |

## Database Schema

### Core Entities

**User** - Student accounts with profile information, university details, and seller status

**Item** - Marketplace listings with images, pricing, condition, and category

**MentorProfile** - Mentor applications with expertise, bio, and approval status

**Conversation** & **Message** - Direct messaging between users

**Question** & **Answer** - Q&A system with mentor responses

**Review** - Transaction reviews with ratings

**Notification** - User notifications for various events

**SavedItem** - User's favorited items

**Badge** & **UserBadge** - Gamification badges

**UserPoints** - Point accumulation

**Report** - User reports for moderation

### Enums

- **Category**: TEXTBOOKS, ELECTRONICS, FURNITURE, CLOTHING, NOTES, OTHER
- **Condition**: NEW, LIKE_NEW, GOOD, FAIR, POOR
- **ItemStatus**: ACTIVE, SOLD, REMOVED
- **QuestionCategory**: ACADEMIC, STUDENT_LIFE, COURSE_ADVICE, TEXTBOOK_RECOMMENDATION
- **MentorStatus**: PENDING, APPROVED, REJECTED
- **MentorType**: STUDENT, ALUMNI
- **NotificationType**: MESSAGE, SALE, QUESTION, ANSWER, ENDORSEMENT, REVIEW
- **BadgeCategory**: SELLER, BUYER, MENTOR, COMMUNITY

## Project Structure

```
sharespace/
├── frontend/
│   ├── app/
│   │   ├── (auth)/             # Login and registration
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/             # Protected routes
│   │   │   ├── marketplace/    # Browse, item details, my listings
│   │   │   ├── mentors/        # Directory, profiles, leaderboard
│   │   │   ├── questions/      # Q&A feed and details
│   │   │   ├── messages/       # Conversations
│   │   │   ├── notifications/  # Notification center
│   │   │   ├── profile/        # User profile, saved items, transactions
│   │   │   ├── analytics/      # Dashboard and stats
│   │   │   └── onboarding/     # New user setup
│   │   ├── admin/              # Admin panel
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # React components
│   ├── lib/
│   │   ├── actions/            # Server actions
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── cognito.ts          # Cognito integration
│   │   ├── prisma.ts           # Database client
│   │   ├── s3.ts               # S3 utilities
│   │   └── types.ts            # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── middleware.ts           # Auth middleware
│
└── ai-guidance/                # Documentation
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL 12+

### Environment Variables

Create `frontend/.env.local`:

```env
DATABASE_URL=postgresql://user:password@host:5432/sharespace
AWS_REGION=eu-west-2
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET=sharespace-images
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-pool-id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
```

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm generate        # Generate Prisma client
pnpm migrate         # Run database migrations
pnpm dev             # Start dev server on :3000
```

### Available Scripts

**Frontend:**

```bash
pnpm dev       # Development server with Turbopack
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
pnpm generate  # Generate Prisma client
pnpm migrate   # Run Prisma migrations
pnpm studio    # Open Prisma Studio
```

## Design System

### Colors

- Primary: red-800 (light) / red-700 (dark)
- Background: white (light) / black (dark)

### Typography

- Primary: Instrument Sans
- Secondary: Instrument Serif

### Components

- Rounded corners (xl, 2xl)
- Soft shadows
- HeroUI base components
- Tailwind utility styling

## Roadmap

### Planned Features

- Course-aware item recommendations
- Payment processing integration
- Mobile application

## Beneficiaries

**Students**: Access affordable second-hand textbooks and equipment with enhanced safety through verified campus community members.

**Senior Students & Alumni**: Build reputation as mentors, earn from selling items, and gain valuable community leadership experience.

**University Services**: Support sustainability goals through measurable reuse metrics and reduced campus waste.

**Course Teams**: Reduce repeated questions by routing students to experienced peer mentors.

## License

This project is private and proprietary.
