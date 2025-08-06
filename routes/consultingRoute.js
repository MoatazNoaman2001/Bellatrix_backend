import express from 'express';
import {
  getAllConsultations,
  getConsultationBySlug,
  getConsultationById,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  toggleConsultationStatus
} from '../controllers/consultingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllConsultations);
router.get('/slug/:slug', getConsultationBySlug);
router.get('/:id', getConsultationById);
router.post('/',authenticateToken , createConsultation);
router.patch('/:id',authenticateToken, updateConsultation);
router.patch('/:id/toggle-status',authenticateToken, toggleConsultationStatus);
router.delete('/:id',authenticateToken, deleteConsultation);

export default router;