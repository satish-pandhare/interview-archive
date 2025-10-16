# Interview Archive

Interview Archive is a comprehensive Next.js 15 web application for storing, organizing, and sharing interview questions and answers. Built with modern technologies including TypeScript, Prisma ORM, PostgreSQL, and shadcn/ui components.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- Install pnpm globally: `npm install -g pnpm`
- Copy environment file: `cp .env.example .env`
- Install dependencies: `pnpm install` -- takes 45 seconds. NEVER CANCEL.
- Set up database: `docker compose up -d` -- takes 9 seconds for PostgreSQL 17.
- Update .env with DATABASE_URL: `postgresql://user:password@localhost:5432/interviewdb`

### Development Workflow
- Start development server: `pnpm dev` -- starts in 1.2 seconds using Turbopack.
- Access application: http://localhost:3000
- Type checking: `pnpm typecheck` -- takes 8 seconds. **Note: Fails without Prisma client generation.**
- Linting: `pnpm lint` -- takes 3 seconds, shows 2 warnings only (no errors).

### Build Process
- **CRITICAL**: Build command `pnpm build` includes `prisma generate && next build`
- **NETWORK LIMITATION**: Prisma binary downloads fail due to network restrictions (binaries.prisma.sh blocked)
- **WORKAROUND**: Database migrations can be applied manually using `docker exec` with concatenated SQL files
- **NEVER CANCEL**: Build may take 15+ minutes when working. Set timeout to 30+ minutes.

### Database Management
- Start database: `docker compose up -d`
- Manual migration application: `cat prisma/migrations/*/migration.sql | docker exec -i interview-archive-db-1 psql -U user -d interviewdb`
- Database connection test: `docker exec interview-archive-db-1 psql -U user -d interviewdb -c "SELECT version();"`
- **Note**: Prisma client generation currently blocked by network restrictions.

## Validation

### Manual Testing Requirements
- **ALWAYS** manually validate application via browser after making changes.
- Test navigation: Landing page → Sign-in page navigation works.
- Test theme toggle: Light/Dark/System mode selection works.
- **FUNCTIONAL VERIFICATION**: Application loads successfully at localhost:3000, navigation works, UI renders correctly.
- OAuth sign-in shows proper interface (Google/GitHub options) but requires environment secrets to function.

### CI/CD Compliance
- **ALWAYS** run `pnpm lint` before committing - CI will fail otherwise.
- **ALWAYS** run `pnpm typecheck` when Prisma client is available.
- CI runs: dependency install, env file copy, typecheck, and lint.

## Known Issues and Limitations

### Network Restrictions
- **Prisma binary downloads fail**: Cannot run `prisma generate` due to blocked binaries.prisma.sh
- **Type checking fails**: Without generated Prisma client, TypeScript shows 27 import errors
- **Build process blocked**: `pnpm build` fails at Prisma generation step
- **Workaround**: Use manual database migration and accept TypeScript errors during development

### Application Functionality
- **Landing page**: Fully functional with proper navigation and theming
- **Authentication**: UI works but requires OAuth secrets (GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, etc.)
- **Main application**: Requires authentication to access protected routes
- **Database**: Schema applied manually, ready for data operations

## Project Structure

### Key Directories
- `/src/app/(landing-page)/` - Public landing pages (home, features, pricing, about)
- `/src/app/(main)/` - Protected application routes (questions, account, groups, interview)
- `/src/app/(auth)/` - Authentication pages
- `/src/app/api/` - API routes (answers, auth, companies, questions, roles, tags, etc.)
- `/src/components/` - Reusable UI components and modals
- `/src/lib/` - Utility functions, auth configuration, database client
- `/prisma/` - Database schema, migrations, and seed data

### Configuration Files
- `package.json` - Dependencies and scripts (pnpm-based)
- `prisma/schema.prisma` - Database schema with PostgreSQL
- `next.config.ts` - Next.js configuration with Turbopack
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `compose.yml` - PostgreSQL database container setup

## Common Tasks

### Starting Development
```bash
# Full setup from scratch
npm install -g pnpm
cp .env.example .env
pnpm install
docker compose up -d
# Update .env with DATABASE_URL=postgresql://user:password@localhost:5432/interviewdb
pnpm dev
```

### Navigation Testing
1. Open http://localhost:3000
2. Click "Get Started" → should navigate to /sign-in
3. Test theme toggle → should show Light/Dark/System options
4. Navigate through landing pages (Features, About, Pricing)

### Technology Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict configuration
- **Database**: PostgreSQL 17 with Prisma ORM
- **UI**: shadcn/ui components with Tailwind CSS v4
- **Authentication**: Better Auth with OAuth (Google, GitHub)
- **Package Manager**: pnpm with workspace configuration
- **Development**: ESLint, TypeScript checking, hot reload

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Authentication secret
- `GITHUB_CLIENT_ID/SECRET` - GitHub OAuth
- `GOOGLE_CLIENT_ID/SECRET` - Google OAuth  
- `UPLOADTHING_TOKEN` - File upload service
- `GOOGLE_GENERATIVE_AI_API_KEY` - AI features

## Timing Expectations
- **pnpm install**: 45 seconds (NEVER CANCEL)
- **pnpm dev**: 1.2 seconds to start
- **pnpm lint**: 3 seconds
- **pnpm typecheck**: 8 seconds (when working)
- **docker compose up**: 9 seconds
- **Build process**: 15+ minutes expected (NEVER CANCEL - set 30+ minute timeout)

## Critical Notes
- **ALWAYS** wait for long-running processes to complete
- **NEVER CANCEL** build or install commands early
- **VALIDATE** all changes by running the application and testing core functionality
- **LINT** before committing to avoid CI failures
- Accept TypeScript errors related to Prisma client imports until network restrictions are resolved