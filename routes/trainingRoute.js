import express from 'express';
import {
  getTrainingPages,
  getTrainingPageBySlug,
  getTrainingPageById,
  createTrainingPage,
  updateTrainingPage,
  deleteTrainingPage,
  toggleTrainingPageStatus,
  uploadTrainingMedia,
  deleteTrainingMedia
} from '../controllers/trainingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTrainingPages);
router.get('/:slug', getTrainingPageBySlug);
router.get('/id/:id', getTrainingPageById);


router.post('/', authenticateToken, createTrainingPage);
router.put('/:id', authenticateToken, updateTrainingPage);
router.delete('/:id', authenticateToken, deleteTrainingPage);
router.patch('/:id/toggle-status', authenticateToken, toggleTrainingPageStatus);
router.post('/upload-media', authenticateToken, uploadTrainingMedia);
router.delete('/delete-media/:type/:filename', authenticateToken, deleteTrainingMedia);

export default router;