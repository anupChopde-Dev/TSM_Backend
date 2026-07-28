import TaskList from '../models/taskList.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskList.find().sort({ createdAt: -1 }).lean();
    res.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { taskName, description, sp, priority, docs } = req.body;

    if (!taskName || sp === undefined || priority === undefined) {
      return res.status(400).json({
        message: 'taskName, sp, and priority are required',
      });
    }

    const newTask = await TaskList.create({
      taskName,
      description,
      sp,
      priority,
      docs: Array.isArray(docs) ? docs : [],
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await TaskList.findById(req.params.id).lean();

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskName, description, sp, priority, docs } = req.body;

    const task = await TaskList.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (taskName !== undefined) task.taskName = taskName;
    if (description !== undefined) task.description = description;
    if (sp !== undefined) task.sp = sp;
    if (priority !== undefined) task.priority = priority;
    if (docs !== undefined) task.docs = Array.isArray(docs) ? docs : task.docs;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskList.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
