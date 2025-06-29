import api from "./api";

// Fetch all tasks from backend
export const fetchTasks = async () => {
  const response = await api.get("/task");
  return response.data;
};

// Create a new task in backend
export const createTask = async (taskData) => {
  const response = await api.post("/task", taskData);
  return response.data;
};

// Update an existing task in backend
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/task/${id}`, taskData);
  return response.data;
};

// Delete a task in backend
export const removeTask = async (id) => {
  const response = await api.delete(`/task/${id}`);
  return response.data;
};

// Duplicate a task in backend
export const duplicateTask = async (id) => {
  const response = await api.post(`/task/${id}/duplicate`);
  return response.data;
};

// Fetch a single task by ID from backend
export const fetchTaskById = async (id) => {
  const response = await api.get(`/task/${id}`);
  return response.data;
};

export const restoreTask = async (id) => {
  const res = await api.put(`/task/${id}/restore`);
  return res.data;
};

export const deleteTaskPermanently = async (id) => {
  const res = await api.delete(`/task/${id}`);
  return res.data;
};

export const restoreAllTasks = async () => {
  const res = await api.put("/task/restore-all");
  return res.data;
};

export const deleteAllTrashedTasks = async () => {
  const res = await api.delete("/task/delete-all");
  return res.data;
};