import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskControllers.js";
import { duplicateTask } from "../controllers/taskControllers.js";

const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);
// Get a single task by ID
router.get("/:id", getTaskById);
// Create a new task
router.post("/", createTask);
// Update a task
router.put("/:id", updateTask);
// Delete a task


router.delete("/:id", deleteTask);
router.post("/:id/duplicate", duplicateTask);
export default router;