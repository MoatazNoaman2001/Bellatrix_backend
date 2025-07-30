import express from 'express';
import {
  getAllIndustries,
  getIndustryBySlug,
  getIndustryById,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  toggleIndustryStatus
} from '../controllers/industriesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllIndustries);
router.get('/slug/:slug', getIndustryBySlug);
router.get('/:id', getIndustryById);
router.post('/',authenticateToken, createIndustry);
router.patch('/:id',authenticateToken, updateIndustry);
router.patch('/:id/toggle-status',authenticateToken, toggleIndustryStatus);
router.delete('/:id',authenticateToken, deleteIndustry);

export default router;