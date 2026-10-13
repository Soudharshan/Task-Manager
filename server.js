const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- tiny JSON-file "database" ----
function readTasks() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// ---- REST API ----
// READ all
app.get("/api/tasks", (req, res) => {
  res.json(readTasks());
});

// CREATE
app.post("/api/tasks", (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "Title is required" });

  const priority = ["low", "medium", "high"].includes(req.body.priority)
    ? req.body.priority
    : "medium";

  const task = {
    id: Date.now(),
    title,
    priority,
    done: false,
    createdAt: new Date().toISOString(),
  };
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
  res.status(201).json(task);
});

// UPDATE (title / priority / done)
app.put("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (typeof req.body.title === "string" && req.body.title.trim()) {
    task.title = req.body.title.trim();
  }
  if (["low", "medium", "high"].includes(req.body.priority)) {
    task.priority = req.body.priority;
  }
  if (typeof req.body.done === "boolean") task.done = req.body.done;

  writeTasks(tasks);
  res.json(task);
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const remaining = tasks.filter((t) => t.id !== Number(req.params.id));
  if (remaining.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }
  writeTasks(remaining);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Task Manager running at http://localhost:${PORT}`);
});
