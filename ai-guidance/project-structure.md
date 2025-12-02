# ShareSpace - Project Structure

## Overview

ShareSpace is a web application built with Next.js.

## Tech Stack

- **Frontend**: Next.js 16.0.3 with React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Bundler**: Turbopack (for dev and build)

## Project Structure

```
sharespace/
├── frontend/           # Next.js application
│   ├── app/           # App router pages and layouts
│   ├── public/        # Static assets
│   ├── next.config.ts # Next.js configuration
│   └── package.json   # Frontend dependencies
├── ai-guidance/       # AI context and documentation
│   ├── project-structure.md
│   └── changelog.md
└── package.json       # Root scripts (proxies to frontend)
```

## Running the Project

From the root directory:

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
