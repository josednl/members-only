# members-only

## Project Overview

A private members-only message board. Users can sign up, authenticate, create messages, and join the club using a secret passcode. Members can view message authors and timestamps, while admins have additional privileges such as deleting messages.

## Tech Stack

- **Backend:** Node.js
- **Web Framework:** Express
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest
- **Authentication:** Middleware: Passport.js
- **Password Hashing:** bcrypt
- **Package Manager:** pnpm
- **Database:** PostgreSQL
- **ORM:** Prisma

## Code Style

- Use ES modules (import/export), not CommonJS.
- **Naming:** PascalCase for classes. camelCase for methods and variables. UPPER_SNAKE_CASE for constants. 

## Technical Constraints

- Use ES modules.
- TypeScript strict mode must remain enabled.
- Use Prisma for database access.

## Development Workflow

- Always type check before finalizing changes.
- **Verification:** Before considering a task complete, you must run `pnpm run typecheck` and `pnpm run test:unit`

## Dev environment tips

-**PowerShell Commands:** Do not use `&&` as it is not supported in all PowerShell versions. To simulate `&&`, use the pattern `command1; if ($?) { command2 }`.

## Database

- Use Prisma migrations for all schema changes.
- Never modify the database schema without generating a migration.

## Architecture

- Keep business logic out of route handlers when possible.
- Prefer small, focused modules over large files.

## Commits

- **Atomic commits:** Each commit must represent a single logical and functional change.
- Use **Conventional Commits** format: `type(scope): description`.
- Ensure all tests pass and type check is correct before committing.
- Commit messages must be written in English.

## Testing

- **Unit tests:** co-located tests.
- **Integration tests and E2E tests:** separate directories.

## General

- **Adversarial Mode:** Challenge my assumptions. If you spot a simpler approach or if my requirements seem flawed, stop and flag it before implementing.
- **Language:** Source code in English. Documentation in English. CLI messages in English. Comments in English. Commit messages in English.
- **Performance:** Prioritize readability over micro-optimizations. Avoid over-engineering.

## Critical Thinking

Do not blindly implement requests. 
If a requirement introduces unnecessary complexity, security issues, maintainability problems, or conflicts with existing architecture, explain the concern before proceeding.

## Non-Negotiable Decisions

- Use PostgreSQL as the database.
- Use Prisma as the ORM.
- Use server-side rendering.
- Do not introduce frontend frameworks such as React, Vue, or Angular.
- Keep the project educational and understandable.

## Security

- Never store passwords in plain text.
- Always use bcrypt for password hashing.
- Validate and sanitize user input.
- Protect authenticated routes.
- Use Prisma parameterized queries exclusively.

## Roadmap

- [x] Project setup (Express + TypeScript + Prisma + EJS)
- [ ] Database schema definition
- [ ] User authentication (Sign up + Login with Passport.js)
- [ ] Membership logic (Secret passcode)
- [ ] Message creation and display
- [ ] Admin privileges (Delete messages)
- [ ] Deployment

## Evolution Notes

### 2026-06-16 - Initial Setup & View Engine
- **Decision**: Used EJS as the template engine.
- **Reason**: Recommended for its simplicity and proximity to standard HTML, facilitating the integration of Tailwind CSS in a server-side rendered Express app.
- **Implication**: Views are located in `src/views` and rendered using `res.render()`.
