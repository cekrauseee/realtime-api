# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A realtime WebSocket API built with Bun, featuring user authentication and topic-based pub/sub communication.

## Development Commands

### Running the Application
- `bun dev` - Start development server with hot reload
- `bun start` - Start production server
- Port: 3001 (configurable via `PORT` env var)

### Code Quality
- `bun check-types` - Run TypeScript type checking
- `bun lint` - Run ESLint
- `bun format` - Format code with Prettier
- `bun format:check` - Check formatting without modifying
- `bun ci` - Run all checks (formatting, linting, type checking)

### Database
- `bun push` - Push Drizzle schema to database
- `bun push:force` - Reset Docker Postgres container and push schema
- Database runs in Docker: `docker compose up -d`

## Architecture

### Domain-Driven Structure

Code is organized by domain under `src/domain/`:

**Infrastructure Layer** (`src/domain/infra/`)
- `http.ts` - Main HTTP request router with authentication middleware
- `ws.ts` - WebSocket connection handler
- `db.ts` - Database connection
- `http/utils/constants.ts` - HTTP route declarations (merged from domain-specific constants)
- `ws/utils/constants.ts` - WebSocket event declarations (merged from domain-specific constants)
- `ws/state.ts` - In-memory WebSocket client management

**Identity Domain** (`src/domain/identity/`)
- `auth/` - Authentication (sign-in, sign-up, session management)
  - JWT-based sessions stored in HTTP-only cookies
  - Session token cookie: `session_token`
- `user/` - User model and repository

**Communication Domain** (`src/domain/communication/`)
- `topic/` - Topic-based messaging with pub/sub pattern
  - Topics are per-user namespaced resources
  - WebSocket clients subscribe to topics using `topic:join` event
  - `listeners.ts` - WebSocket event handlers

### Domain Module Pattern

Each domain feature follows this structure:
- `model.ts` - Drizzle ORM schema definition
- `repo.ts` - Database queries
- `controller.ts` - HTTP request handlers
- `service.ts` - Business logic
- `dtos.ts` - Zod validation schemas for request payloads
- `listeners.ts` - WebSocket event handlers (communication domain)
- `utils/constants.ts` - Route/event declarations
- `utils/types.ts` - TypeScript type definitions
- `utils/schemas.ts` - Zod schemas
- `utils/helpers.ts` - Utility functions

### Route Registration

Routes are declared in domain-specific constants files and merged in infrastructure:

1. Each domain exports `PATHNAMES_DECLARATION` (e.g., `AUTH_PATHNAMES_DECLARATION`, `TOPIC_PATHNAMES_DECLARATION`)
2. `src/domain/infra/http/utils/constants.ts` merges all declarations
3. Router in `src/domain/infra/http.ts` dispatches based on merged declarations
4. Routes can be public or protected (requires JWT authentication)

### WebSocket Event Registration

Similar pattern for WebSocket events:

1. Each domain exports `EVENTS_DECLARATION` (e.g., `TOPIC_EVENTS_DECLARATION`)
2. `src/domain/infra/ws/utils/constants.ts` merges all event declarations
3. WebSocket handler in `src/domain/infra/ws.ts` dispatches events to listeners

### WebSocket Client Management

- Clients stored in-memory in `src/domain/infra/ws/state.ts`
- Each client is wrapped with subscription callbacks
- Clients are keyed by user ID
- On disconnect, all subscriptions are cleaned up

### Database

- PostgreSQL with Drizzle ORM
- Schema at `src/domain/infra/db/schema.ts` exports all models
- Models defined in `<domain>/<feature>/model.ts`
- Database configured in `drizzle.config.ts`

## Environment Configuration

Required environment variables (see `.env.example`):
- `PORT` - Server port (default: 3001)
- `WEB_URL` - Frontend URL for CORS
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing

## Path Aliases

TypeScript path alias: `@/*` maps to `src/*`
