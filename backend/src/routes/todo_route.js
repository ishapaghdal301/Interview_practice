const express = require('express');
const router = express.Router();
const Todo = require('../models/Todos');

// Create a new to-do item
router.post('/todos', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTodo = new Todo({
      title,
      description,
      dueDate,
      priority,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating to-do item', error });
  }
});

// Get all to-do items
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching to-do items', error });
  }
});

// Update a to-do item
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, completed },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating to-do item', error });
  }
});

// Delete a to-do item
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'To-do item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting to-do item', error });
  }
});

module.exports = router;
