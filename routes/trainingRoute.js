import express from 'express';
const router = express.Router();
import { getTraining, createTraining, updateTraining, deleteTraining } from '../controllers/homePageConrollers/trainingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.get('/', getTraining);
router.post('/', authenticateToken, createTraining);
router.patch('/', authenticateToken, updateTraining);
router.delete('/', authenticateToken, deleteTraining);

export default router; 