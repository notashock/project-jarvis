import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../mcp/tools/taskTool.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (err: any) {
    next(err);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err: any) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    res.json(task);
  } catch (err: any) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err: any) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteTask(req.params.id);
    res.json(result);
  } catch (err: any) {
    next(err);
  }
});

export default router;
