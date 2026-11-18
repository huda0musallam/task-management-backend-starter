import test from "node:test";
import assert from "node:assert/strict";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../src/modules/tasks.js";

test("creates a task with a title and default completed state", () => {
  const task = createTask({ title: "Learn Node.js" });
  assert.equal(task.title, "Learn Node.js");
  assert.equal(task.completed, false);
  assert.equal(typeof task.id, "number");
});

test("rejects an empty task title", () => {
  assert.throws(() => createTask({ title: " " }), /non-empty title/);
});

test("finds and updates a task", () => {
  const task = createTask({ title: "Original title" });
  const updated = updateTask(task.id, { completed: true });
  assert.equal(updated.completed, true);
  assert.equal(getTaskById(task.id).completed, true);
});

test("deletes a task", () => {
  const task = createTask({ title: "Temporary task" });
  assert.equal(deleteTask(task.id), true);
  assert.equal(getTaskById(task.id), null);
});

test("returns a copy of the task list", () => {
  assert.ok(Array.isArray(getAllTasks()));
});
