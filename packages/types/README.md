# @onrepeat/types

Shared TypeScript types package for the OnRepeat Music monorepo.

## What's Included

- **OpenAPI Generated Types**: TypeScript types automatically generated from the backend's Swagger/OpenAPI specification
- **Domain Types**: Shared domain-specific types (can be added as needed)

## Usage

### In Other Packages

```typescript
import { paths, components, operations } from '@onrepeat/types';
```

### Generating Types

The OpenAPI types are generated from the backend's Swagger endpoint.

```bash
# Generate types once (waits for backend if not running)
pnpm types:generate

# Watch backend changes and auto-regenerate
pnpm types:watch
```

**Note**: The backend must be running on port 3000 (or set `BACKEND_PORT` environment variable) for type generation to work.

## Development

The types package uses:
- `openapi-typescript` - Generates TypeScript types from OpenAPI spec
- `tsx` - Runs TypeScript files directly
- `nodemon` - Watches for changes and regenerates types

## File Structure

```
packages/types/
├── src/
│   ├── index.ts          # Main exports
│   └── api/
│       └── v1.d.ts       # Generated OpenAPI types (auto-generated)
├── scripts/
│   └── generate.ts       # Type generation script
└── package.json
```

**⚠️ Important**: Do not manually edit `src/api/v1.d.ts` - it is auto-generated. Any changes will be overwritten.
