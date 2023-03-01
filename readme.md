# Calculator

A simple calculator app that performs basic arithmetic operations like addition, subtraction, multiplication, and division. The project is a monorepo managed by Turborepo. There are two apps - backend and frontend. Backend is just a very simple Express.js server exposing API endpoint that handles the logic of calculations. Frontend is a UI layer that renders calculator component and calls backend to get the result of the operation.

## Tech stack

- Next.js, React (frontend)
- Node.js, Express.js (backend)
- Turborepo
- TypeScript
- Docker
- Jest, React Testing Library, MSW, Supertest

## Source

- `apps/backend` - Express.js API
- `apps/frontend` - Next.js app
- `packages/core` - code to share between frontend and backend

## Running locally

> You need Node in version 18 (or higher) installed beforehand.

Install npm dependencies:

```shell
npm install
```

Run apps in dev mode:

```shell
npm run dev
```

You can now access services:

```
frontend http://localhost:3000
backend  http://localhost:3001
```

## Running via Docker

Firstly create a network, which allows containers to communicate:

```shell
docker network calculator-network
```

Then, build docker images for backend and frontend:

```shell
npm run docker:build
```

Finally, run docker containers:

```shell
npm run docker:start
```

_Ports used by dockerized services are the same as in "Running locally" section._

## Tests

All packages and apps have tests using Jest as a test runner.\
To run tests for all workspaces:

```shell
npm run test
```

To run tests for specific app/package (in this example: frontend):

```shell
npm run test -- --filter=@workspace/frontend
```

_The value of the `--filter` argument comes from the `package.json` of targeted workspace._
