const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, async (req, res) => {
  const { title } = req.body;

  try {
    const task = new Task({ title, user: req.user });

    await task.save();

    res.status(201).json({ message: "Task added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding task." });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks." });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
