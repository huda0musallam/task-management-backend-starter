# Task Management Backend Starter

A small Node.js backend project using ES Modules (ESM) and in-memory data.

## Requirements

- Node.js 18 or newer
- npm

## Run the project

```bash
npm start
```

The server starts at `http://localhost:3000`.

## Available scripts

- `npm start` — start the API server.
- `npm run dev` — restart the server when source files change.
- `npm test` — run automated tests.
- `npm run check` — check JavaScript syntax.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| GET | `/tasks/:id` | Get one task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get one user |

### Create a task

Send a `POST` request to `/tasks` with JSON:

```json
{
  "title": "Learn Node.js",
  "userId": 1
}
```

A task title is required and cannot be empty. New tasks start with `completed: false`.

### Update a task

Send a `PATCH` request to `/tasks/:id` with any supported fields:

```json
{
  "completed": true
}
```

## Example using curl

```bash
curl http://localhost:3000/tasks
curl http://localhost:3000/users
```

## Project structure

```text
task-management-backend-starter/
├── src/
│   ├── modules/
│   │   ├── tasks.js
│   │   └── users.js
│   └── server.js
├── test/
│   └── tasks.test.js
├── .gitignore
├── package.json
└── README.md
```

## Data storage

Tasks and users are stored in JavaScript arrays in memory. Data is reset when the server restarts. No database is required for this assignment.
