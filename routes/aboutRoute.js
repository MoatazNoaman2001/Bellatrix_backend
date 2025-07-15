import express from 'express';
const router = express.Router();
import { getAbout, createAbout, updateAbout, deleteAbout } from '../controllers/aboutController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

router.get('/', getAbout);
router.post('/', authenticateToken, upload.single('media'), createAbout);
router.patch('/', authenticateToken, upload.single('media'), updateAbout);
router.delete('/', authenticateToken, deleteAbout);

export default router;