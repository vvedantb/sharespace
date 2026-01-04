# Part 2: Marketplace & Q&A (2-3 min)

## Marketplace

**[SCREEN: Browse marketplace page]**

> "The marketplace uses Next.js server components to fetch initial items from our PostgreSQL database via Prisma. For filtering and search, we use nuqs to sync state with URL parameters - so filters like price range, category, and sort order persist in the URL and can be shared.
>
> Client-side updates use TanStack Query. When users change filters, it fetches fresh data from our server actions while showing the server-rendered items as placeholder data."

**[SCREEN: Open create item modal]**

> "Creating a listing uses React Hook Form with Zod validation. Images upload directly to S3 - we generate presigned URLs server-side so clients can upload without exposing AWS credentials. The presigned URL expires after 5 minutes for security."

**[SCREEN: Submit item, show it appear]**

> "When submitted, a server action inserts the item into Prisma and triggers our gamification system - awarding 5 points to the seller. Items can be marked as sold, which awards points to both buyer and seller and checks for badge unlocks."

---

## Q&A System

**[SCREEN: Questions page showing trending section]**

> "The Q&A section shows trending questions - calculated by views and answer count from the last 7 days using a Prisma query with date filtering and aggregate counts.
>
> Only approved mentors can answer questions. When an answer is posted, a server action creates the answer, increments the mentor's totalAnswers count, creates a notification for the question asker, and awards 10 points."

**[SCREEN: Question detail page with answers]**

> "The question asker can mark a best answer - this updates the question status to 'ANSWERED' and highlights that answer with a badge. Users can also mark answers as helpful, which increments the mentor's helpfulAnswers count used for leaderboard rankings."

**[SCREEN: Show best answer badge]**

> "All mutations use TanStack Query with optimistic updates for instant UI feedback, rolling back if the server action fails."
