import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const {title, description} = req.body;
    const newTask = new Task({userId: req.user, title, description});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({message: 'Server error', error});
  }
};

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({message: 'Server error', error});
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user});
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json(task);
  } catch (error) {
    res.status(500).json({message: 'Server error', error});
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {_id: req.params.id, userId: req.user},
      req.body,
      {new: true}
    );
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json(task);
  } catch (error) {
    res.status(500).json({message: 'Server error', error});
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json({message: 'Task deleted successfully'});
  } catch (error) {
    res.status(500).json({message: 'Server error', error});
  }
};
