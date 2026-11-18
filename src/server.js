import { createServer } from "node:http";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "./modules/tasks.js";
import { getAllUsers, getUserById } from "./modules/users.js";

const PORT = Number(process.env.PORT) || 3000;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJsonBody(request) {
  let rawBody = "";
  for await (const chunk of request) rawBody += chunk;
  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch {
    throw new Error("Request body must contain valid JSON.");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const parts = url.pathname.split("/").filter(Boolean);
  const [resource, id] = parts;
  const method = request.method;

  try {
    if (resource === "tasks" && parts.length === 1) {
      if (method === "GET") return sendJson(response, 200, getAllTasks());

      if (method === "POST") {
        const body = await readJsonBody(request);
        const task = createTask(body);
        return sendJson(response, 201, task);
      }
    }

    if (resource === "tasks" && parts.length === 2) {
      if (method === "GET") {
        const task = getTaskById(id);
        return task
          ? sendJson(response, 200, task)
          : sendJson(response, 404, { error: "Task not found." });
      }

      if (method === "PATCH") {
        const body = await readJsonBody(request);
        const task = updateTask(id, body);
        return task
          ? sendJson(response, 200, task)
          : sendJson(response, 404, { error: "Task not found." });
      }

      if (method === "DELETE") {
        return deleteTask(id)
          ? sendJson(response, 200, { message: "Task deleted successfully." })
          : sendJson(response, 404, { error: "Task not found." });
      }
    }

    if (resource === "users" && parts.length === 1 && method === "GET") {
      return sendJson(response, 200, getAllUsers());
    }

    if (resource === "users" && parts.length === 2 && method === "GET") {
      const user = getUserById(id);
      return user
        ? sendJson(response, 200, user)
        : sendJson(response, 404, { error: "User not found." });
    }

    return sendJson(response, 404, { error: "Route not found." });
  } catch (error) {
    const statusCode = error.message.includes("JSON") ? 400 : 400;
    return sendJson(response, statusCode, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Task Management API is running at http://localhost:${PORT}`);
});
