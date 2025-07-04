import { Router } from 'express';
import { createAdmin, login, uploadImage, getProfile } from '../controllers/homePageConrollers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

const router = Router();

router.post('/create-admin', createAdmin);
router.post('/login', login);
router.post('/upload-image', authenticateToken, upload.single('image'), uploadImage);
router.get('/profile', authenticateToken, getProfile);

export default router;