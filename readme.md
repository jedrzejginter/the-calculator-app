# Calculator

A simple calculator app that performs basic arithmetic operations like addition, subtraction, multiplication, and division. The project is a monorepo managed by Turborepo. There are two apps - backend and frontend. Backend is just a very simple Express.js server exposing API endpoint that handles the logic of calculations. Frontend is a UI layer that renders calculator component and calls backend to get the result of the operation.

## Tech stack

- Next.js, React (frontend)
- Node.js, Express.js (backend)
- Turborepo
- TypeScript
- Docker
- Jest, React Testing Library, Supertest

## Source

- `apps/backend` - Express.js API
- `apps/frontend` - Next.js app
- `packages/core` - code to share between frontend and backend

## Running locally

> You need Node in version 18 (or higher) installed beforehand.

```shell
# Step 1
# Install npm dependencies.
npm install

# Step 2
# Run apps in dev mode.
npm run dev
```

## Running via Docker

```shell
# Step 1
# Create a network, which allows containers to communicate.
docker network calculator-network

# Step 2
# Build docker images for backend and frontend.
npm run docker:build

# Step 3
# Run docker containers.
npm run docker:start
```
