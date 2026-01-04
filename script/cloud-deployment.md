# Part 7: Cloud Deployment with Vercel (1-2 min)

**[SCREEN: Show Vercel dashboard]**

> "ShareSpace is deployed on Vercel, which integrates directly with our GitHub repository. Vercel provides automatic CI/CD - every push to GitHub triggers a new build in their pipeline."

**[SCREEN: Show deployment or preview URL]**

> "We have two environments: production deploys from the `main` branch, and preview environments are generated for every pull request. This means before merging any feature, we get a live preview URL to test the changes in a real environment - not just localhost.
>
> Preview deployments catch environment-specific bugs and let stakeholders review features before they go live."

**[SCREEN: Show a successful deployment]**

> "The CI/CD pipeline runs automatically - Vercel installs dependencies, runs the build, and deploys to their edge network. If the build fails, the deployment is blocked and we get notified immediately.
>
> This serverless architecture means we don't manage any infrastructure. Vercel handles scaling, SSL certificates, and global CDN distribution - our Next.js app just works."
