import express from 'express';
import {
  getTasks,
  createTask,
  getTaskById,
  getTasksByProjectAndUser,
  updateTask,
  deleteTask,
  updateTaskStatus
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/project/:projectId/user/:userId', getTasksByProjectAndUser);
router.get('/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.put('/taskUpdate/:id', updateTaskStatus);

export default router;
