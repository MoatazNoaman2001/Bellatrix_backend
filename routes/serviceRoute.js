import express from 'express';
import { createOrUpdateServiceWithMedia, deleteService, getAllServices, getServiceBySlug, handleMediaUpload, toggleServiceStatus, updateService, updateServiceSection, updateServiceWithMedia, uploadServiceMedia } from '../controllers/ServiceController';
import { authenticateToken } from '../middleware/authMiddleware';


const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post('/',authenticateToken, handleMediaUpload, createOrUpdateServiceWithMedia);
router.patch('/:slug',authenticateToken, updateService);
router.patch('/:slug/with-media',authenticateToken, handleMediaUpload, updateServiceWithMedia);
router.patch('/:slug/media',authenticateToken, handleMediaUpload, uploadServiceMedia);
router.patch('/:slug/sections/:section',authenticateToken, updateServiceSection);
router.patch('/:slug/status',authenticateToken, toggleServiceStatus);
router.delete('/:slug',authenticateToken, deleteService);

export default router;