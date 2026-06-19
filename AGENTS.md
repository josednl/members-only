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

- **Ponytail Mindset (Lazy Senior Developer)**: Apply the **Reflex Ladder** for every task:
  1. **YAGNI**: Does this actually need to exist? If not, skip it.
  2. **Standard Library/Native Feature**: Use built-in Node.js/Express/HTML/CSS features before reaching for packages.
  3. **Existing Dependency**: Use what we already have (Prisma, Passport, etc.).
  4. **Minimum Code**: Write the absolute minimum viable code.
- **The Best Code is No Code**: Every line is a liability. Avoid over-engineering.
- **Lazy, Not Negligent**: Minimize implementation, but NEVER compromise on security, data integrity, or accessibility.
- **Adversarial Mode**: Challenge requirements that introduce unnecessary complexity.
- **Language**: All code and docs in English.

## Critical Thinking

Do not blindly implement requests. 
1. If a requirement can be met with a native platform feature (e.g., native HTML validation instead of a JS library), propose it.
2. If a library is requested but we can solve it with a one-liner or standard module, use the simpler path.
3. Explain why the "lazy" (minimalist) approach is better for maintenance and performance.


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
- [x] Database schema definition (Models defined, migration pending)
- [x] User authentication (Sign up + Login with Passport.js)
- [x] Membership logic (Secret passcode)
- [x] Message creation and display
- [ ] Admin privileges (Delete messages)
- [ ] Deployment

## Evolution Notes

### 2026-06-16 - Initial Setup & View Engine
- **Decision**: Used EJS as the template engine.
- **Reason**: Recommended for its simplicity and proximity to standard HTML, facilitating the integration of Tailwind CSS in a server-side rendered Express app.
- **Implication**: Views are located in `src/views` and rendered using `res.render()`.

### 2026-06-19 - Remove concurrently dependency
- **Decision**: Remove concurrently from project setup.
- **Reason**: Running multiple processes through a single command added unnecessary complexity and did not provide enough benefit for the current development workflow.
- **Implication**: Development processes are now started independently, resulting in a simpler setup and clearer process management.
