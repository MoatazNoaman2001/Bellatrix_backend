import express from 'express';
const router = express.Router();
import { getServices, createServices, updateServices, deleteServices } from '../controllers/homePageConrollers/serviceController.js';
import { getTestimonials, createTestimonials, updateTestimonials, deleteTestimonials } from '../controllers/homePageConrollers/testimonialController.js';
import { createHero, deleteHero, getHero, updateHero } from '../controllers/homePageConrollers/heroController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { createIndustries, deleteIndustries, getIndustries, updateIndustries } from '../controllers/homePageConrollers/industryConroller.js';
import { upload } from '../middleware/multerConfig.js';
import { getLandingPage } from '../controllers/homePageConrollers/landingController.js';

router.get('/hero', getHero);
router.post('/hero', authenticateToken, upload.single('media'), createHero);
router.patch('/hero', authenticateToken, upload.single('media'), updateHero);
router.delete('/hero', authenticateToken, deleteHero);

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

router.get('/all', getLandingPage);

export default router;