# Part 3: Mentors & Messaging (2-3 min)

## Mentor System

**[SCREEN: Mentor directory page]**

> "The mentor directory fetches approved mentors from Prisma, ordered by endorsement count. Search uses TanStack Query - only enabled when there's a search term, with server-rendered mentors as placeholder data.
>
> Students in year 3 or above can apply to become mentors, as can alumni. Applications go to an admin queue for approval."

**[SCREEN: Mentor detail page]**

> "Each mentor shows a rating calculated from their helpful answers ratio, plus their total answers and endorsement count. Users can endorse mentors - this uses a Prisma transaction to atomically create the endorsement record, increment the count, and create a notification."

**[SCREEN: Mentor leaderboard]**

> "The leaderboard ranks the top 20 mentors by helpful answers. This drives engagement - mentors are incentivized to give quality answers that get marked helpful."

---

## Messaging

**[SCREEN: Messages inbox]**

> "Messaging uses TanStack Query with a 3-second polling interval for near-real-time updates. When a conversation is selected, it fetches messages and marks them as read in parallel.
>
> Sending a message uses optimistic updates - the message appears instantly with a temporary ID while the mutation runs. If it fails, TanStack Query rolls back to the previous state."

**[SCREEN: Send a message, show it appear instantly]**

> "The server action creates the message in Prisma and generates a notification for the recipient. The notification includes a preview of the message content and links directly to the conversation."

**[SCREEN: Show notification bell with new message]**

> "The notification bell in the navbar shows unread count - fetched server-side and passed to the client component. Clicking a notification marks it as read and navigates to the relevant page."
