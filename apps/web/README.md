# OnRepeat Music - Web App

Next.js 15 frontend application for OnRepeat Music.

> **Note**: This is part of a pnpm workspace monorepo. For general setup and installation instructions, see the [root README](../../README.md).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI, Shadcn UI
- **State Management**: Zustand
- **API Client**: openapi-fetch (type-safe with generated types from `@onrepeat/types`)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Backend API running (see `apps/backend/README.md`)

### Development

From the **root** of the monorepo:

```bash
# Run web app only
pnpm dev:web

# Or run both backend and web together
pnpm dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000).

### Production

```bash
# Build the web app
pnpm build:web

# Start production server
pnpm start:web
```

## Environment Variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_HOST=http://localhost:3000
```

## Type-Safe API Calls

This app uses OpenAPI-generated types from the `@onrepeat/types` package for type-safe API calls:

```typescript
import { createClient } from '@/lib/api/client';
import type { paths } from '@onrepeat/types';

// Types are automatically generated from backend Swagger spec
const client = createClient<paths>();
```

Types are automatically generated when you run `pnpm types:generate` from the root. See the [root README](../../README.md) for more details.

## Project Structure

```
apps/web/
├── app/              # Next.js App Router pages
├── modules/           # Feature modules (auth, feed, etc.)
├── lib/               # Utilities and API client
├── components/        # Shared UI components
└── public/            # Static assets
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
