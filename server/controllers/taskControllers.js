// Add a comment to a task's activities
export const addTaskComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment || !comment.trim()) {
    return res.status(400).json({ status: false, message: "Comment is required" });
  }
  // Optionally, get user from req.user if you have auth
  const by = req.user?._id || null;
  const activity = {
    type: "commented",
    activity: comment,
    date: new Date(),
    by: by,
  };
  const task = await Task.findByIdAndUpdate(
    id,
    { $push: { activities: activity } },
    { new: true }
  );
  if (!task) {
    return res.status(404).json({ status: false, message: "Task not found" });
  }
  res.status(200).json({ status: true, activity });
});
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

// // Create a new task
// export const createTask = asyncHandler(async (req, res) => {
//   const task = await Task.create(req.body);
//   res.status(201).json(task);
// });

// // Update a task
// export const updateTask = asyncHandler(async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!task) {
//     return res.status(404).json({ status: false, message: "Task not found" });
//   }
//   res.status(200).json(task);
// });

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



export const createTask = asyncHandler(async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ status: false, message: "Title and date are required" });
  }
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ status: false, message: "Title and date are required" });
  }
  // ...existing code...
});


// taskControllers.js
export const restoreTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { isTrashed: false }, { new: true });
  res.status(200).json(task);
});

export const deleteTaskPermanently = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Task deleted permanently" });
});

export const restoreAllTasks = asyncHandler(async (req, res) => {
  await Task.updateMany({ isTrashed: true }, { isTrashed: false });
  res.status(200).json({ message: "All tasks restored" });
});

export const deleteAllTrashedTasks = asyncHandler(async (req, res) => {
  await Task.deleteMany({ isTrashed: true });
  res.status(200).json({ message: "All trashed tasks deleted" });
});