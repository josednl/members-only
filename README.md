# Members Only

A private members-only message board. Users sign up, authenticate, create messages, and join the club with a secret passcode to reveal who wrote what. Admins have additional privileges to delete messages.

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript (strict mode) |
| **Web framework** | Express 5 |
| **Template engine** | EJS |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7 |
| **Auth** | Passport.js (local strategy) |
| **Sessions** | PostgreSQL via connect-pg-simple |
| **Validation** | express-validator |
| **Password hashing** | bcrypt |
| **Testing** | Vitest |
| **Package manager** | pnpm |

## Prerequisites

- Node.js >= 22
- pnpm >= 11.5
- PostgreSQL running locally

## Setup

```bash
# Clone and install
git clone <repo-url>
cd members-only
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and passcodes

pnpm db:migrate

# Generate Prisma client
pnpm db:generate

# Build CSS
pnpm build:css
```

### Development

```bash
pnpm dev          # dev server with hot reload
pnpm watch:css    # rebuild CSS on changes
```

### Production

```bash
pnpm start        # tsx src/app.ts
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (e.g. `postgresql://user:password@localhost:5432/members_only?schema=public`) |
| `SESSION_SECRET` | Yes | Secret used to sign session cookies |
| `SECRET_PASSCODE` | Yes | Passcode users enter to become members |
| `SECRET_ADMIN_PASSCODE` | Yes | Passcode to grant admin privileges |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with hot reload (tsx watch) |
| `pnpm start` | Start production server |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test:unit` | Run unit tests (Vitest) |
| `pnpm build:css` | Build Tailwind CSS for production |
| `pnpm watch:css` | Build Tailwind CSS in watch mode |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Apply pending migrations |

## Features

### User roles

| Role | Can view messages | Can see authors | Can create messages | Can delete messages |
|---|---|---|---|---|
| **Visitor** (not logged in) | Yes | No | No | No |
| **User** (logged in) | Yes | No | Yes | No |
| **Member** | Yes | Yes | Yes | No |
| **Admin** | Yes | Yes | Yes | Yes |

### Routing

| Route | Description |
|---|---|
| `GET /` | Homepage — message board with skeleton loading |
| `GET /sign-up` | Registration form |
| `POST /sign-up` | Create account |
| `GET /login` | Login form |
| `POST /login` | Authenticate |
| `POST /logout` | Log out |
| `GET /join` | Member passcode form |
| `POST /join` | Redeem member passcode |
| `GET /join-admin` | Admin passcode form |
| `POST /join-admin` | Redeem admin passcode |
| `GET /messages/new` | New message form |
| `POST /messages` | Create message |
| `POST /messages/:id/delete` | Delete message (admin only) |
| `GET /api/messages` | Messages JSON endpoint |

## Project Structure

```
src/
├── app.ts                          # Express app entry point
├── input.css                       # Tailwind entry point
├── config/
│   ├── passport.ts                 # Passport local strategy setup
│   └── prisma.ts                   # Prisma client singleton
├── controllers/
│   ├── authController.ts           # Auth request handlers
│   └── messageController.ts        # Message CRUD handlers
├── middleware/
│   └── errorHandler.ts             # Global error handler
├── routes/
│   ├── authRoutes.ts               # Auth route definitions
│   └── messageRoutes.ts            # Message route definitions
├── lib/
│   ├── serializeMessages.ts        # Message serialization logic
│   └── serializeMessages.test.ts   # Unit tests
├── views/
│   ├── partials/                   # Reusable EJS partials
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   ├── error-banner.ejs
│   │   ├── validation-errors.ejs
│   │   ├── skeleton-card.ejs
│   │   └── form-submit-loader.ejs
│   ├── index.ejs                   # Homepage with skeleton loading
│   ├── login.ejs
│   ├── sign-up.ejs
│   ├── join.ejs
│   ├── admin-join.ejs
│   ├── new-message.ejs
│   └── error.ejs
└── generated/
    └── client/                     # Generated Prisma client

prisma/
├── schema.prisma                   # Database schema
└── migrations/                     # Migration history
```
