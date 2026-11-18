let nextTaskId = 1;

const tasks = [];

export function getAllTasks() {
  return [...tasks];
}

export function getTaskById(id) {
  return tasks.find((task) => task.id === Number(id)) ?? null;
}

export function createTask({ title, userId }) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("A non-empty title is required.");
  }

  const task = {
    id: nextTaskId++,
    title: title.trim(),
    completed: false,
    userId: userId === undefined ? null : Number(userId)
  };

  tasks.push(task);
  return { ...task };
}

export function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) {
    if (typeof updates.title !== "string" || updates.title.trim() === "") {
      throw new Error("Title must be a non-empty string.");
    }
    task.title = updates.title.trim();
  }

  if (updates.completed !== undefined) {
    if (typeof updates.completed !== "boolean") {
      throw new Error("Completed must be a boolean.");
    }
    task.completed = updates.completed;
  }

  if (updates.userId !== undefined) {
    task.userId = updates.userId === null ? null : Number(updates.userId);
  }

  return { ...task };
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
