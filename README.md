# 🚀 TanStack Start Enterprise Template

A modern, production-ready, and highly opinionated full-stack starter template built on **TanStack Start**, **React 19**, and **Vite**. It's designed for maximum type safety, developer experience, and performance, leveraging the power of the **Bun** ecosystem.

## ✨ Features

- **Full-Stack React**: Powered by [TanStack Start](https://tanstack.com/start) (Router + Query + SSR + Server Functions).
- **React 19 Ready**: Utilizing the new [React Compiler](https://react.dev/learn/react-compiler) for automatic memoization and performance optimizations.
- **Modern Styling**: [Tailwind CSS v4](https://tailwindcss.com/) combined with highly customizable [Shadcn UI](https://ui.shadcn.com/) / Base UI components.
- **Type-Safe Database**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL for robust, fully-typed database interactions.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for simple, scalable, and type-safe global state.
- **Internationalization (i18n)**: [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for fully type-safe, zero-runtime-overhead translations.
- **Error Tracking**: Built-in [Sentry](https://sentry.io/) integration for React and Server components.
- **Blazing Fast Tooling**: Built on [Vite](https://vitejs.dev/) and powered by [Bun](https://bun.sh/) for lightning-fast installs and execution.
- **Docker Ready**: Pre-configured `Dockerfile` and `compose.yml` for seamless deployment.

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | [TanStack Start](https://tanstack.com/start), React 19, [Nitro](https://nitro.unjs.io/) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Lucide Icons, Framer Motion |
| **UI Components** | Shadcn UI, Base UI, Radix UI Primitives |
| **Database** | Drizzle ORM, PostgreSQL |
| **State Management**| Zustand, TanStack Query |
| **Tooling** | Vite, Bun, ESLint, Prettier, Vitest |
| **i18n** | Paraglide JS |

---

## 📂 Project Structure

```text
.
├── messages/               # i18n translation files (en.json, de.json, etc.)
├── project.inlang/         # Paraglide JS configuration
├── public/                 # Static assets
├── src/
│   ├── db/                 # Drizzle ORM schema and database client
│   ├── integrations/       # Third-party integrations (e.g., TanStack Devtools)
│   ├── lib/                # Utility functions
│   ├── routes/             # TanStack Router file-based routing
│   ├── shared/             # Shared application logic
│   │   ├── stores/         # Zustand state stores
│   │   ├── styles/         # Global and theme CSS
│   │   ├── types/          # Global TypeScript definitions
│   │   ├── ui/             # Reusable UI components (Shadcn/Base UI)
│   │   └── utils/          # Shared utilities
│   ├── widgets/            # Complex, feature-specific components and providers
│   └── router.tsx          # TanStack Router initialization
├── .env.example            # Environment variables template
├── components.json         # Shadcn UI configuration
├── drizzle.config.ts       # Drizzle ORM configuration
├── instrument.server.mjs   # Sentry server instrumentation
└── vite.config.ts          # Vite configuration (React Compiler, Nitro, Tailwind v4)
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Bun](https://bun.sh/) (Recommended) or Node.js >= 20
- PostgreSQL (Local instance or Docker)

### 1. Clone & Install

```bash
# Install dependencies using Bun
bun install
```

### 2. Environment Variables

Copy the example environment file and configure your local variables:

```bash
cp .env.example .env.local
```

Make sure to update the database connection string and any Sentry/API keys in `.env.local`.

### 3. Database Setup

Generate and apply Drizzle migrations to your local PostgreSQL database:

```bash
bun run db:generate
bun run db:migrate

# Alternatively, if you want to push the schema directly:
bun run db:push
```

To view and manage your data, you can launch Drizzle Studio:

```bash
bun run db:studio
```

### 4. Run the Development Server

Start the Vite development server with hot module replacement (HMR):

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

- `bun run dev`: Starts the development server.
- `bun run build`: Builds the application for production.
- `bun run start`: Runs the compiled production server.
- `bun run preview`: Locally previews the production build.
- `bun run test`: Runs the Vitest test suite.
- `bun run lint`: Runs ESLint.
- `bun run format`: Checks code formatting with Prettier.
- `bun run check`: Runs TypeScript type checking.
- `bun run db:*`: Drizzle ORM commands (`generate`, `migrate`, `push`, `pull`, `studio`).

---

## 🌐 Internationalization (i18n)

This template uses **Paraglide JS** for type-safe internationalization.
- Translation files are located in the `messages/` directory (e.g., `en.json`, `de.json`).
- When you update the JSON files, Paraglide automatically generates type-safe getter functions.
- The active locale is managed via the URL or base settings configured in `vite.config.ts`.

---

## 🐳 Docker Deployment

The project includes a ready-to-use `Dockerfile` and `compose.yml` for containerized deployments.

To build and run the application using Docker Compose:

```bash
docker compose up --build -d
```

The app will be exposed on port `3000` (configurable in `compose.yml`).

---

## 🛡️ License

This project is licensed under the MIT License.
