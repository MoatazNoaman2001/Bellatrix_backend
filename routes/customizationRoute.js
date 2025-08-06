// customizationRoutes.js
import express from 'express';
import {
  getAllCustomizations,
  getCustomizationBySlug,
  getCustomizationById,
  createCustomization,
  updateCustomization,
  deleteCustomization,
  toggleCustomizationStatus
} from '../controllers/customizationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const customizationRouter = express.Router();

// GET Routes
customizationRouter.get('/', getAllCustomizations);
customizationRouter.get('/slug/:slug', getCustomizationBySlug);
customizationRouter.get('/:id', getCustomizationById);

// POST Routes
customizationRouter.post('/',authenticateToken, createCustomization);

// PATCH Routes
customizationRouter.patch('/:id',authenticateToken, updateCustomization);
customizationRouter.patch('/:id/toggle-status',authenticateToken, toggleCustomizationStatus);

// DELETE Routes
customizationRouter.delete('/:id',authenticateToken, deleteCustomization);

export { customizationRouter };
