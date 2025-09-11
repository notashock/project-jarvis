import Task from "../../models/Task.js";

// Create Task
export const createTask = async (data: any) => {
  const task = new Task({
    ...data,
    source: data.source || "manual",
  });
  await task.save();
  return task;
};

// Get All Tasks
export const getTasks = async () => {
  return Task.find();
};

// Get Task by ID
export const getTaskById = async (id: string) => {
  const task = await Task.findById(id);
  if (!task) throw new Error("Task not found");
  return task;
};

// Update Task
export const updateTask = async (id: string, data: any) => {
  const task = await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!task) throw new Error("Task not found");
  return task;
};

// Delete Task
export const deleteTask = async (id: string) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new Error("Task not found");
  return { message: "Task deleted" };
};
