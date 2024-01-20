// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      logger.error(`Error in GET /tasks: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a task
router.put('/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      // Emit Socket.IO event for real-time updates
      io.emit('taskUpdated', updatedTask);
  
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
