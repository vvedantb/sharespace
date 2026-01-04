# Part 1: Authentication & Onboarding (1-2 min)

**[SCREEN: Register page]**

> "ShareSpace uses AWS Cognito for authentication. On signup, users must provide a valid university email - we validate against educational domains like .ac.uk and .edu to ensure only students can join.
>
> When you register, the app creates a user in Cognito, stores the JWT access token in a cookie, then inserts a user record into our PostgreSQL database via Prisma - linking the Cognito ID to our internal user data."

**[SCREEN: Submit registration, show redirect to onboarding]**

> "After signup, you're redirected to onboarding where you can optionally complete your profile - avatar, username, university, course, and year of study. Avatar images upload directly to S3 using presigned URLs."

**[SCREEN: Complete onboarding or skip]**

> "You can skip this and complete it later. Either way, the `hasCompletedOnboarding` flag is set to true so you won't see this again."

**[SCREEN: Login page]**

> "For returning users, login authenticates against Cognito and stores the access token. Our middleware checks this token on every protected route, and server actions verify it using AWS JWT verification before querying the database."

**[SCREEN: Logged in, show marketplace]**

> "That's our auth flow - Cognito handles passwords securely, JWTs provide stateless authentication, and Prisma manages our user data."
