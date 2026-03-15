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

This will automatically generate Prisma Client for the backend after installation.

### Development

```bash
# Run both backend and web in development mode (recommended)
pnpm dev

# Run individual services
pnpm dev:backend  # Backend only
pnpm dev:web      # Web only
```

The `pnpm dev` command uses `concurrently` to run both services in the same terminal with color-coded output:
- Backend logs appear in **blue**
- Web logs appear in **green**

### Production

```bash
# Run both backend and web in production mode
pnpm start

# Run individual services
pnpm start:backend  # Backend only
pnpm start:web      # Web only
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
# Run migrations (development)
pnpm db:migrate:dev

# Run migrations (production)
pnpm db:migrate

# Seed database
pnpm db:seed

# Setup database (migrate + seed)
pnpm db:setup
```

### Prisma

```bash
# Generate Prisma Client (usually runs automatically after install)
pnpm prisma:generate
```

## Available Scripts

### Development

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start both backend and web in development mode |
| `pnpm dev:backend` | Start backend development server only |
| `pnpm dev:web` | Start web development server only |

### Production

| Script | Description |
|--------|-------------|
| `pnpm start` | Start both backend and web in production mode |
| `pnpm start:backend` | Start backend production server only |
| `pnpm start:web` | Start web production server only |

### Build

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages |
| `pnpm build:backend` | Build backend only |
| `pnpm build:web` | Build web only |

### Linting & Testing

| Script | Description |
|--------|-------------|
| `pnpm lint` | Lint all packages |
| `pnpm lint:backend` | Lint backend only |
| `pnpm lint:web` | Lint web only |
| `pnpm test` | Run backend tests |
| `pnpm test:backend` | Run backend tests (alias) |
| `pnpm format` | Format backend code with Prettier |

### Database

| Script | Description |
|--------|-------------|
| `pnpm db:migrate` | Run database migrations (production) |
| `pnpm db:migrate:dev` | Run database migrations (development) |
| `pnpm db:seed` | Seed the database |
| `pnpm db:setup` | Setup database (migrate + seed) |

### Prisma

| Script | Description |
|--------|-------------|
| `pnpm prisma:generate` | Generate Prisma Client |

### Package-specific scripts

Use `pnpm --filter <package-name> <script>` to run scripts in specific packages:

```bash
# Backend specific
pnpm --filter @onrepeat/backend start:dev
pnpm --filter @onrepeat/backend test
pnpm --filter @onrepeat/backend migrate:dev

# Web specific
pnpm --filter @onrepeat/web dev
pnpm --filter @onrepeat/web build
```

## Environment Variables

- **Backend**: Create `backend/.env` file (see `backend/.env.example` if available)
- **Web**: Create `web/.env.local` file (see `web/.env.example` if available)

## Workspace

This is a pnpm workspace monorepo. All dependencies are managed from the root, and packages can reference each other using the workspace protocol:

```json
{
  "dependencies": {
    "@onrepeat/backend": "workspace:*"
  }
}
```

## Tech Stack

- **Backend**: NestJS, Prisma, PostgreSQL
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces
