import express from 'express';
import { deleteUser, getUsers, updateUserBlock } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.patch('/:id/block', updateUserBlock);
router.delete('/delete/:id', deleteUser);

export default router;
