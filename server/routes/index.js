import express from "express";
import taskRoutes from "./taskRoutes.js";
import userRoutes from "./userRoutes.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import { getTaskById } from "../controllers/taskControllers.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task",taskRoutes);

// router.get("/:id", validateObjectId, getTaskById);
// router.put("/:id", validateObjectId, updateTask);
// router.delete("/:id", validateObjectId, deleteTask);
// router.post("/:id/duplicate", validateObjectId, duplicateTask);



export default router;
