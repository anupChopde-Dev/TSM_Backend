const tasks = [];

export const getTasks = (req, res) => {
  res.json(tasks);
};

export const createTask = (req, res) => {
  const { title, description, status } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const getTaskById = (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

export const updateTask = (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, description, status } = req.body;
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;
  task.updatedAt = new Date().toISOString();

  res.json(task);
};

export const deleteTask = (req, res) => {
  const index = tasks.findIndex((task) => task.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
};
