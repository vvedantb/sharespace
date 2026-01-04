# Part 8: AWS Infrastructure & Technical Architecture (3-4 min)

## Database Layer with Prisma & RDS

**[SCREEN: Show Prisma schema or RDS console]**

> "Our database runs on AWS RDS with PostgreSQL. We use Prisma as our ORM layer - it provides type-safe database queries, automatic migrations, and a clean schema definition language.
>
> The Prisma schema defines all our models: Users, Items, Questions, Answers, Conversations, Messages, Notifications, Badges, and more. Each model maps to a PostgreSQL table with proper relations and indexes."

**[SCREEN: Show lib/prisma.ts singleton pattern]**

> "We use a singleton pattern for the Prisma client to prevent connection pool exhaustion during development hot reloads. In production, a single client instance manages our database connections efficiently."

---

## S3 for File Storage

**[SCREEN: Show S3 bucket or upload flow]**

> "User uploads - avatars and item images - go to AWS S3. Instead of routing files through our server, we use presigned URLs. The server generates a time-limited upload URL, and the client uploads directly to S3 - reducing server load and latency.
>
> The presigned URL expires after 5 minutes and includes the final file path, so we know the URL before upload completes. Files are organized into folders: `/avatars` for profile pictures and `/items` for marketplace images."

---

## Authentication with Cognito

**[SCREEN: Show Cognito or auth flow]**

> "AWS Cognito handles all authentication. User passwords never touch our backend - Cognito manages password hashing, verification, and token generation.
>
> On login, Cognito returns JWT tokens. We store the access token in an HTTP-only cookie with a 7-day expiry. Server actions verify this token using AWS JWT verification before accessing protected resources."

---

## Caching with TanStack Query

**[SCREEN: Show a query example or network tab]**

> "We minimize API calls using TanStack Query's built-in caching. Queries are cached by key - so navigating back to a page shows cached data instantly while revalidating in the background.
>
> For search and filtering, we use the `enabled` option - queries only run when there's actual input, preventing unnecessary requests. Placeholder data from server-rendered content shows immediately while client queries load."

**[SCREEN: Show optimistic update in messages]**

> "Mutations use optimistic updates - when you send a message, it appears instantly in the UI while the server request happens in the background. If it fails, TanStack Query automatically rolls back to the previous state."

---

## Server Architecture

**[SCREEN: Show server actions or Next.js structure]**

> "We use Next.js Server Actions instead of a separate API. Server actions are colocated TypeScript functions that run on the server - they can directly query Prisma without exposing database logic to the client.
>
> This eliminates the need for REST endpoints, reduces boilerplate, and provides end-to-end type safety. The server handles data fetching, mutations, and validation in one place."

---

## Tool Justifications

**[SCREEN: Show tech stack overview or package.json]**

> "Let me briefly justify our technology choices:
>
> **Next.js with React 19** - Server components reduce client bundle size, server actions simplify the API layer, and the App Router provides intuitive file-based routing.
>
> **Prisma ORM** - Type-safe queries prevent runtime errors, migrations track schema changes, and the query API is more readable than raw SQL.
>
> **AWS RDS** - Managed PostgreSQL means automatic backups, patches, and scaling without infrastructure overhead.
>
> **AWS S3 with presigned URLs** - Direct uploads reduce server bandwidth, presigned URLs maintain security without exposing credentials.
>
> **AWS Cognito** - Managed auth handles password security, token rotation, and scales automatically - we didn't want to build auth from scratch.
>
> **TanStack Query** - data fetching with caching, background refetching, and optimistic updates out of the box.
>
> **React Hook Form with Zod** - Performant forms with minimal re-renders, and Zod provides runtime validation matching our TypeScript types.
>
> **nuqs** - URL state management keeps filters shareable and survives page refreshes - better UX than local state.
>
> **Tailwind CSS with HeroUI** - Utility-first CSS is fast to write and consistent to maintain. HeroUI provides accessible, styled components that match our design system.
>
> **Vercel** - Zero-config deployment for Next.js with automatic CI/CD, preview environments, and edge caching.
>
> Every tool was chosen to maximize developer productivity while maintaining performance and security."
