import express from 'express';
const router = express.Router();
import { getServices, createServices, updateServices, deleteServices } from '../controllers/serviceController.js';
import { getTestimonials, createTestimonials, updateTestimonials, deleteTestimonials } from '../controllers/testimonialController.js';
import { createHero, deleteHero, getHero, updateHero } from '../controllers/herocontroller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { createIndustries, deleteIndustries, getIndustries, updateIndustries } from '../controllers/industryConroller.js';

router.get('/hero', getHero);
router.post('/hero',authenticateToken, createHero);
router.patch('/hero',authenticateToken, updateHero);
router.delete('/hero',authenticateToken, deleteHero);

router.get('/services', getServices);
router.post('/services',authenticateToken, createServices);
router.patch('/services',authenticateToken, updateServices);
router.delete('/services',authenticateToken, deleteServices);

router.get('/testimonials', getTestimonials);
router.post('/testimonials',authenticateToken, createTestimonials);
router.patch('/testimonials',authenticateToken, updateTestimonials);
router.delete('/testimonials',authenticateToken, deleteTestimonials);

router.get('/industries', getIndustries);
router.post('/industries',authenticateToken, createIndustries);
router.patch('/industries',authenticateToken, updateIndustries);
router.delete('/industries',authenticateToken, deleteIndustries);

export default router;