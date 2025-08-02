import express from 'express';
import {
  getImplementationPages,
  getImplementationPageBySlug,
  getImplementationPageById,
  createImplementationPage,
  updateImplementationPage,
  deleteImplementationPage,
  toggleImplementationPageStatus,
  uploadHeroVideo,
  deleteHeroVideo
} from '../controllers/implementationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
    
router.get('/', getImplementationPages);
router.get('/:slug', getImplementationPageBySlug);
router.get('/id/:id', getImplementationPageById);

router.post('/', authenticateToken, createImplementationPage);
router.put('/:id', authenticateToken, updateImplementationPage);
router.delete('/:id', authenticateToken, deleteImplementationPage);
router.patch('/:id/toggle-status', authenticateToken, toggleImplementationPageStatus);
router.post('/upload-video', authenticateToken, uploadHeroVideo);
router.delete('/delete-video/:filename', authenticateToken, deleteHeroVideo);

export default router;