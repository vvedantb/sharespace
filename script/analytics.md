# Part 4: Analytics, Gamification & Admin (2-3 min)

## Gamification System

**[SCREEN: Profile page showing badges and points]**

> "ShareSpace has a points and badges system to drive engagement. Points are awarded for actions: 5 for listing an item, 20 for selling, 10 for purchasing, 5 for asking questions, 10 for answering, and 15 when your answer is marked helpful.
>
> After each action, a server action calls `checkAndAwardBadges` which queries Prisma for the user's counts - items sold, questions asked, helpful answers - and compares against badge thresholds."

**[SCREEN: Show badge being earned or badge display]**

> "There are 6 badges across 4 categories: Seller, Buyer, Mentor, and Community. When earned, the badge is stored in a UserBadge join table and a notification is created. The BadgeDisplay component renders them with category-based colors."

---

## Seller Analytics

**[SCREEN: Seller analytics page]**

> "Sellers get analytics on their listings. The `getSellerAnalytics` server action aggregates data from Prisma - total views, saves, and inquiry counts using relation counts. We calculate conversion rate as inquiries divided by views.
>
> There's also sustainability tracking - items reused, estimated money saved for buyers, and CO2 prevented - encouraging the second-hand marketplace mission."

---

## Admin Dashboard

**[SCREEN: Admin mentor applications page]**

> "Admins access a protected dashboard - the layout checks `user.isAdmin` and redirects unauthorized users. The mentor applications page fetches pending profiles from Prisma with user details.
>
> Approve and reject buttons trigger server actions that update the mentor status and timestamp. We use TanStack Query mutations with loading states for feedback."

**[SCREEN: Admin reports page]**

> "The reports page shows user-submitted reports for items or users - including reason, reporter info, and item thumbnails if applicable. Admins can resolve or dismiss reports, updating their status in the database."

**[SCREEN: Show the admin navigation]**

> "All admin pages use server components for data fetching - no client-side data loading needed. This keeps the admin interface fast and secure since all authorization happens server-side before any data is returned."
