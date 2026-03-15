# OnRepeat Music

Monorepo for OnRepeat Music application.

## Structure

- `backend/` - NestJS backend API
- `web/` - Next.js frontend application

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

```bash
# Run backend in development mode
pnpm dev:backend

# Run web in development mode
pnpm dev

# Run both (requires running in separate terminals)
pnpm dev:backend  # Terminal 1
pnpm dev          # Terminal 2
```

### Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:backend
pnpm build:web
```

### Database

```bash
# Run migrations
pnpm db:migrate:dev

# Seed database
pnpm db:seed

# Setup database (migrate + seed)
pnpm db:setup
```

## Scripts

### Root level scripts

- `pnpm dev` - Start web development server
- `pnpm dev:backend` - Start backend development server
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Run backend tests
- `pnpm db:migrate:dev` - Run database migrations
- `pnpm db:seed` - Seed database
- `pnpm db:setup` - Setup database (migrate + seed)

### Package-specific scripts

Use `pnpm --filter <package-name> <script>` to run scripts in specific packages:

```bash
# Backend specific
pnpm --filter @onrepeat/backend start:dev
pnpm --filter @onrepeat/backend test

# Web specific
pnpm --filter @onrepeat/web dev
pnpm --filter @onrepeat/web build
```

## Environment Variables

- Backend: Create `backend/.env` file (see `backend/.env.example` if available)
- Web: Create `web/.env.local` file (see `web/.env.example` if available)

## Workspace

This is a pnpm workspace monorepo. All dependencies are managed from the root, and packages can reference each other using the workspace protocol:

```json
{
  "dependencies": {
    "@onrepeat/backend": "workspace:*"
  }
}
```
