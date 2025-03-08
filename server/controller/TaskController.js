const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create the new task object
    const newTask = {
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.tasks.push(newTask);

    // Save the updated user document with the new task
    await user.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    // console.log({ user, userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "Admin") {
      // Find all tasks from all users
      const users = await User.find({ role: "User" }); // Get all users
      let allTasks = [];
      users.forEach((u) => {
        allTasks = [...allTasks, ...u.tasks];
      });
      return res.status(200).json(allTasks);
    }
    // Send the tasks of the user
    if (user.tasks.length === 0) {
      res.status(200).json({ tasks: user.tasks, message: "No tasks found" });
    }
    res.status(200).json(user.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to update a task
exports.updateTask = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const task = user.tasks.id(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    // console.log(task);
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;

    // Save the user document with the updated task
    await user.save();

    res.status(200).json({ task, message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to delete a task
exports.deleteTask = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const task = user.tasks.id(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    let deletedtask = user.tasks.pull(req.params.id);
    // console.log(deletedtask);
    await user.save();

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedtask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
