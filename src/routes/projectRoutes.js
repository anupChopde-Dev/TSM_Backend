import express from 'express';
import {
  getProjects,
  getProjectsByUser,
  getProjectOptionsByUser,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/user/:userId/options', getProjectOptionsByUser);
router.get('/user/:userId', getProjectsByUser);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
