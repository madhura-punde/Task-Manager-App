const express = require("express");
const router = express.Router();

// Import the controller
const taskController = require("../controller/TaskController");
const authMiddleware = require("../middleware/authmiddleware");

// Route to create a new task
router.post("/", authMiddleware, taskController.createTask);

// Route to get all tasks
router.get("/", authMiddleware, taskController.getUserTasks);

// Route to get a task by ID
router.get("/:id", authMiddleware, taskController.getTaskById);

// Route to update a task
router.put("/:id", authMiddleware, taskController.updateTask);

// Route to delete a task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
