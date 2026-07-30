import express from 'express';
import { getUsers, updateUserBlock } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.patch('/:id/block', updateUserBlock);

export default router;
