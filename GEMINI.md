
## Project Overview

A private members-only message board. Users can sign up, authenticate, create messages, and join the club using a secret passcode. Members can view message authors and timestamps, while admins have additional privileges such as deleting messages.

## Tech Stack

- **Backend**: Node.js
- **Web Framework**: Express
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Authentication** Middleware: Passport.js
- **Password Hashing**: bcrypt
- **Package Manager**: pnpm
- **Database**: PostgreSQL
- **ORM**: Prisma

## Code Style

- Use ES modules (import/export), not CommonJS.
- **Naming**: PascalCase for classes. camelCase for methods and variables. UPPER_SNAKE_CASE for constants. 
- Enable TypeScript strict mode.

## Workflow

- Always type check before finalizing changes.
- **Verification:** Before considering a task complete, you must run `pnpm run typecheck` and `pnpm run test:unit`

## Dev environment tips

-**PowerShell Commands**: Do not use `&&` as it is not supported in all PowerShell versions. To simulate `&&`, use the pattern `command1; if ($?) { command2 }`.

## Database

- Use Prisma migrations for all schema changes.
- Never modify the database schema without generating a migration.

## Architecture

- Keep business logic out of route handlers when possible.
- Prefer small, focused modules over large files.

## Commits

- **Atomic commits**: Each commit must represent a single logical and functional change.
- Ensure all tests pass and type check is correct before committing.
- Commit messages must be written in English.

## Testing

- **Unit tests**: co-located tests.
- **Integration tests and E2E tests**: separate directories.

## General

- **Adversarial Mode**: Challenge my assumptions. If you spot a simpler approach or if my requirements seem flawed, stop and flag it before implementing.
- **Language**: Source code in English. Documentation in English. CLI messages in English. Comments in English. Commit messages in English.
- **Performance**: Prioritize readability over micro-optimizations. Avoid over-engineering.
- 