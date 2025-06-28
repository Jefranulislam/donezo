import Task from "../models/task.js";
import asyncHandler from "express-async-handler";

// Get all tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// Get a single task by ID
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ status: false, message: "Task not found" });
  }
  res.status(200).json(task);
});

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// Update a task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) {
    return res.status(404).json({ status: false, message: "Task not found" });
  }
  res.status(200).json(task);
});

// Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ status: false, message: "Task not found" });
  }
  res.status(200).json({ status: true, message: "Task deleted" });
});


// Duplicate a task
export const duplicateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    const newTaskData = {
      ...task.toObject(),
      _id: undefined,
      title: task.title + " Duplicate",
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
      team: task.team,
      subTask: task.subTask,
      assets: task.assets,
      priority: task.priority,
      stage: task.stage
    };
    const newTask = await Task.create(newTaskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
});