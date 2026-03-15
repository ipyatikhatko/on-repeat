# OnRepeat Music

A modern monorepo for the OnRepeat Music application, built with pnpm workspaces.

## 📁 Project Structure

```
onrepeat-music/
├── apps/
│   ├── backend/          # NestJS backend API
│   └── web/              # Next.js frontend application
├── packages/
│   └── types/            # Shared TypeScript types (OpenAPI generated)
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml   # Workspace definition
└── pnpm-lock.yaml        # Lock file (shared across all packages)
```

### Apps

- **`apps/backend/`** - NestJS REST API with Prisma ORM
- **`apps/web/`** - Next.js 15 frontend with React 19

### Packages

- **`packages/types/`** - Shared TypeScript types package
  - Auto-generated OpenAPI types from backend Swagger spec
  - Domain-specific shared types
  - Used by web app for type-safe API calls

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

### OpenAPI Types

The `@onrepeat/types` package automatically generates TypeScript types from the backend's Swagger/OpenAPI specification.

```bash
# Generate OpenAPI types from backend (waits for backend if not running)
pnpm types:generate

# Watch backend changes and auto-regenerate types
pnpm types:watch
```

**How it works:**
1. Backend exposes Swagger at `http://localhost:3000/swagger/json`
2. Types package fetches the OpenAPI spec
3. Generates TypeScript types using `openapi-typescript`
4. Types are exported from `@onrepeat/types` package
5. Web app imports types for type-safe API calls

**Note**: The backend must be running for type generation to work. The types are automatically generated when you run `pnpm dev` (if backend starts first).

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

### Types

| Script | Description |
|--------|-------------|
| `pnpm types:generate` | Generate OpenAPI types from backend (waits for backend if not running) |
| `pnpm types:watch` | Watch backend changes and auto-regenerate OpenAPI types |

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

# Types package
pnpm --filter @onrepeat/types generate
```

## Environment Variables

- **Backend**: Create `apps/backend/.env` file (see `apps/backend/.env.example` if available)
- **Web**: Create `apps/web/.env.local` file (see `apps/web/.env.example` if available)

## 🏗️ Monorepo Architecture

This is a **pnpm workspace monorepo** using the following structure:

- **Apps** (`apps/*`) - Deployable applications (backend, web)
- **Packages** (`packages/*`) - Shared libraries and utilities (types)

### How It Works

1. **Dependency Management**: All dependencies are installed at the root and shared via symlinks
2. **Workspace Protocol**: Packages can reference each other using `workspace:*`
3. **Isolated node_modules**: Each package has its own `node_modules` with symlinks to the root store
4. **Single Lock File**: One `pnpm-lock.yaml` manages all dependencies

### Using Workspace Packages

Packages can depend on each other using the workspace protocol:

```json
{
  "dependencies": {
    "@onrepeat/types": "workspace:*"
  }
}
```

**Current Usage:**
- `apps/web` depends on `packages/types` for OpenAPI-generated types

## 🛠️ Tech Stack

### Backend (`apps/backend/`)
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **API Docs**: Swagger/OpenAPI
- **Authentication**: JWT, Google OAuth

### Frontend (`apps/web/`)
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI, Shadcn UI
- **State Management**: Zustand
- **API Client**: openapi-fetch (type-safe with generated types)

### Shared (`packages/types/`)
- **Type Generation**: openapi-typescript
- **Source**: Backend Swagger/OpenAPI spec

### Tooling
- **Package Manager**: pnpm 8+
- **Monorepo**: pnpm workspaces
- **Task Runner**: concurrently (for running multiple services)
- **Language**: TypeScript