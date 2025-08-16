import { Router } from "express";
import { getTasks, addTask, toggleTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id", toggleTask);
router.delete("/:id", deleteTask);

export default router;
