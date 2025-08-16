import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export async function getTasks(req: Request, res: Response) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function addTask(req: Request, res: Response) {
  const { title, deadline } = req.body;
  if (!title || !deadline) return res.status(400).json({ error: "Title & deadline required" });

  const task = await taskService.createTask(title, deadline);
  res.status(201).json(task);
}

export async function toggleTask(req: Request, res: Response) {
  const { id } = req.params;
  const { done } = req.body;
  const task = await taskService.updateTask(id, done);

  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const task = await taskService.deleteTask(id);

  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted" });
}
