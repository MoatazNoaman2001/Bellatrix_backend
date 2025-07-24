import express from 'express';
import { createOrUpdateServiceWithMedia, deleteService, getAllServices, getServiceBySlug, handleMediaUpload, toggleServiceStatus, updateService, updateServiceSection, updateServiceWithMedia, uploadServiceMedia } from '../controllers/ServiceController';


const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post('/', handleMediaUpload, createOrUpdateServiceWithMedia);
router.patch('/:slug', updateService);
router.patch('/:slug/with-media', handleMediaUpload, updateServiceWithMedia);
router.patch('/:slug/media', handleMediaUpload, uploadServiceMedia);
router.patch('/:slug/sections/:section', updateServiceSection);
router.patch('/:slug/status', toggleServiceStatus);
router.delete('/:slug', deleteService);

export default router;