import Task from "../models/taskModel";

export async function getAllTasks() {
  return Task.find().sort({ deadline: 1 });
}

export async function createTask(title: string, deadline: string) {
  return Task.create({ title, deadline });
}

export async function updateTask(id: string, done: boolean) {
  return Task.findByIdAndUpdate(id, { done }, { new: true });
}

export async function deleteTask(id: string) {
  return Task.findByIdAndDelete(id);
}
