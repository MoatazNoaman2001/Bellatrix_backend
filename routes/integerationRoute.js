import express from 'express';
const router = express.Router();
import { getIntegration, createIntegration, updateIntegration, deleteIntegration } from '../controllers/integerationController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

router.get('/', getIntegration);
router.post('/', authenticateToken, upload.single('media'), createIntegration);
router.patch('/', authenticateToken, upload.single('media'), updateIntegration);
router.delete('/', authenticateToken, deleteIntegration);

export default router;