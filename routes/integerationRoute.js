
// integrationRoutes.js
import express from 'express';
import {
  getAllIntegrations,
  getIntegrationBySlug,
  getIntegrationById,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  toggleIntegrationStatus
} from '../controllers/integerationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const integrationRouter = express.Router();

// GET Routes
integrationRouter.get('/', getAllIntegrations);
integrationRouter.get('/slug/:slug', getIntegrationBySlug);
integrationRouter.get('/:id', getIntegrationById);

// POST Routes
integrationRouter.post('/',authenticateToken, createIntegration);

// PATCH Routes
integrationRouter.patch('/:id',authenticateToken, updateIntegration);
integrationRouter.patch('/:id/toggle-status',authenticateToken, toggleIntegrationStatus);

// DELETE Routes
integrationRouter.delete('/:id',authenticateToken, deleteIntegration);

export default integrationRouter ;