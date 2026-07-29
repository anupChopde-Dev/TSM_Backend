import express from 'express';
import {
  getTasks,
  createTask,
  getTaskById,
  getTasksByProjectAndUser,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/project/:projectId/user/:userId', getTasksByProjectAndUser);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
