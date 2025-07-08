import express from 'express';
const router = express.Router();
import { getTraining, createTraining, updateTraining, deleteTraining } from '../controllers/homePageConrollers/trainingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

router.get('/', getTraining);
router.post('/', authenticateToken, upload.single('media'), createTraining);
router.patch('/', authenticateToken, upload.single('media'), updateTraining);
router.delete('/', authenticateToken, deleteTraining);

export default router; 