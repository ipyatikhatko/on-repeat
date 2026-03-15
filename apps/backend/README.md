# OnRepeat Music - Backend API

NestJS REST API for OnRepeat Music.

> **Note**: This is part of a pnpm workspace monorepo. For general setup and installation instructions, see the [root README](../../README.md).

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **API Docs**: Swagger/OpenAPI
- **Authentication**: JWT, Google OAuth

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL database

### Development

From the **root** of the monorepo:

```bash
# Run backend only
pnpm dev:backend

# Or run both backend and web together
pnpm dev
```

The API will be available at [http://localhost:3000](http://localhost:3000).

Swagger documentation: [http://localhost:3000/swagger](http://localhost:3000/swagger)

### Production

```bash
# Build the backend
pnpm build:backend

# Start production server
pnpm start:backend
```

## Environment Variables

Create `apps/backend/.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/onrepeat"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# OAuth (Google)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Frontend URL (for CORS)
FRONTEND_HOST=http://localhost:3000
```

## Database

### Migrations

```bash
# Development (creates migration files)
pnpm db:migrate:dev

# Production (applies migrations)
pnpm db:migrate

# Reset database
pnpm --filter @onrepeat/backend migrate:reset
```

### Seeding

```bash
# Seed the database
pnpm db:seed

# Setup database (migrate + seed)
pnpm db:setup
```

### Prisma Client

Prisma Client is automatically generated after `pnpm install` via the `postinstall` script. To regenerate manually:

```bash
pnpm prisma:generate
```

## API Documentation

The API exposes Swagger/OpenAPI documentation at `/swagger` when running in development mode.

The OpenAPI spec is available at `/swagger/json` and is used by the `@onrepeat/types` package to generate TypeScript types for the frontend.

## Project Structure

```
apps/backend/
├── src/
│   ├── auth/          # Authentication module
│   ├── feed/           # Feed/posts module
│   ├── user/           # User management
│   ├── search/         # Search functionality
│   └── prisma/         # Prisma service and module
├── prisma/
│   ├── schema.prisma   # Database schema
│   ├── migrations/     # Database migrations
│   └── seed.ts         # Database seed script
└── test/               # E2E tests
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm --filter @onrepeat/backend test:e2e

# Test coverage
pnpm --filter @onrepeat/backend test:cov
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
