import express from 'express';
const router = express.Router();
import { getPayroll, createPayroll, updatePayroll, deletePayroll } from '../controllers/payrollController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

router.get('/', getPayroll);
router.post('/', authenticateToken, upload.single('media'), createPayroll);
router.patch('/', authenticateToken, upload.single('media'), updatePayroll);
router.delete('/', authenticateToken, deletePayroll);

export default router; 