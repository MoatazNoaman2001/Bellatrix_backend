import express from 'express';
const router = express.Router();
import { getServices, createServices, updateServices, deleteServices } from '../controllers/homePageConrollers/serviceController.js';
import { getTestimonials, createTestimonials, updateTestimonials, deleteTestimonials } from '../controllers/homePageConrollers/testimonialController.js';
import { createHero, deleteHero, getHero, updateHero } from '../controllers/homePageConrollers/heroController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { createIndustries, deleteIndustries, getIndustries, updateIndustries } from '../controllers/homePageConrollers/industryConroller.js';
import { upload } from '../middleware/multerConfig.js';
import { getLandingPage } from '../controllers/homePageConrollers/landingController.js';

/**
 * @swagger
 * tags:
 *   name: Landing Page
 *   description: Landing page content management
 * 
 * components:
 *   schemas:
 *     Hero:
 *       type: object
 *       properties:
 *         slides:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Strategic Business Transformation"
 *               subtitle:
 *                 type: string
 *                 example: "Oracle NetSuite Consultancy"
 *               description:
 *                 type: string
 *                 example: "Streamline operations and drive growth"
 *               media:
 *                 type: string
 *                 example: "/Videos/HomeHeroSectionV.mp4"
 *               cta:
 *                 type: string
 *                 example: "Explore Services"
 *         stats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: "200+"
 *               label:
 *                 type: string
 *                 example: "Projects"
 *     
 *     ServiceSection:
 *       type: object
 *       properties:
 *         services:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Strategic Consultation"
 *               description:
 *                 type: string
 *                 example: "Expert analysis to optimize your NetSuite roadmap"
 *               icon:
 *                 type: string
 *                 example: "LightbulbOutlined"
 *               color:
 *                 type: string
 *                 example: "#10B981"
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Business process analysis", "ROI forecasting"]
 *               stats:
 *                 type: string
 *                 example: "92% client satisfaction rate"
 *         sectionHeader:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Our Professional Services"
 *             subtitle:
 *               type: string
 *               example: "Comprehensive solutions tailored to your business needs"
 *             gradientText:
 *               type: string
 *               example: "Professional Services"
 * 
 *     Testimonial:
 *       type: object
 *       properties:
 *         testimonials:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               quote:
 *                 type: string
 *                 example: "Bellatrix transformed our operations"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               title:
 *                 type: string
 *                 example: "CEO of TechCorp"
 *               avatar:
 *                 type: string
 *                 example: "JD"
 *               rating:
 *                 type: number
 *                 example: 5
 *               results:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["40% efficiency boost", "Seamless migration"]
 * 
 *     Industry:
 *       type: object
 *       properties:
 *         industries:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "manufacturing"
 *               label:
 *                 type: string
 *                 example: "Manufacturing"
 *               icon:
 *                 type: string
 *                 example: "Factory"
 *               content:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Manufacturing Solutions"
 *                   description:
 *                     type: string
 *                     example: "Streamline your manufacturing operations"
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                   image:
 *                     type: string
 *                     example: "https://images.unsplash.com/photo-123"
 */

// Hero Section Routes
/**
 * @swagger
 * /api/landing/hero:
 *   get:
 *     summary: Get hero section content
 *     description: Retrieve the hero section content for the landing page
 *     tags: [Landing Page]
 *     responses:
 *       200:
 *         description: Hero content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/hero', getHero);

/**
 * @swagger
 * /api/landing/hero:
 *   post:
 *     summary: Create hero section
 *     description: Create new hero section content with optional media upload
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slides:
 *                 type: string
 *                 description: JSON string of slides array
 *                 example: '[{"title":"New Hero Title","subtitle":"Subtitle","description":"Description"}]'
 *               stats:
 *                 type: string
 *                 description: JSON string of stats array
 *                 example: '[{"value":"250+","label":"Projects Completed"}]'
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Hero media file (image or video)
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       201:
 *         description: Hero section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/hero', authenticateToken, upload.single('media'), createHero);

/**
 * @swagger
 * /api/landing/hero:
 *   patch:
 *     summary: Update hero section
 *     description: Update existing hero section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slides:
 *                 type: string
 *                 description: JSON string of updated slides
 *               stats:
 *                 type: string
 *                 description: JSON string of updated stats
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: New hero media file
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       200:
 *         description: Hero section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */
router.patch('/hero', authenticateToken, upload.single('media'), updateHero);

/**
 * @swagger
 * /api/landing/hero:
 *   delete:
 *     summary: Delete hero section
 *     description: Delete the hero section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Hero section deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.delete('/hero', authenticateToken, deleteHero);

// Services Section Routes
/**
 * @swagger
 * /api/landing/services:
 *   get:
 *     summary: Get services section
 *     description: Retrieve the services section content for the landing page
 *     tags: [Landing Page]
 *     responses:
 *       200:
 *         description: Services content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceSection'
 *       500:
 *         description: Server error
 */
router.get('/services', getServices);

/**
 * @swagger
 * /api/landing/services:
 *   post:
 *     summary: Create services section
 *     description: Create new services section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceSection'
 *     responses:
 *       201:
 *         description: Services section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceSection'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/services', authenticateToken, createServices);

/**
 * @swagger
 * /api/landing/services:
 *   patch:
 *     summary: Update services section
 *     description: Update existing services section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceSection'
 *     responses:
 *       200:
 *         description: Services section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceSection'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.patch('/services', authenticateToken, updateServices);

/**
 * @swagger
 * /api/landing/services:
 *   delete:
 *     summary: Delete services section
 *     description: Delete the services section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Services section deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/services', authenticateToken, deleteServices);

// Testimonials Section Routes
/**
 * @swagger
 * /api/landing/testimonials:
 *   get:
 *     summary: Get testimonials section
 *     description: Retrieve the testimonials section content
 *     tags: [Landing Page]
 *     responses:
 *       200:
 *         description: Testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       500:
 *         description: Server error
 */
router.get('/testimonials', getTestimonials);

/**
 * @swagger
 * /api/landing/testimonials:
 *   post:
 *     summary: Create testimonials section
 *     description: Create new testimonials section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonials created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/testimonials', authenticateToken, createTestimonials);

/**
 * @swagger
 * /api/landing/testimonials:
 *   patch:
 *     summary: Update testimonials section
 *     description: Update existing testimonials section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Testimonials updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/testimonials', authenticateToken, updateTestimonials);

/**
 * @swagger
 * /api/landing/testimonials:
 *   delete:
 *     summary: Delete testimonials section
 *     description: Delete the testimonials section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Testimonials deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/testimonials', authenticateToken, deleteTestimonials);

// Industries Section Routes
/**
 * @swagger
 * /api/landing/industries:
 *   get:
 *     summary: Get industries section
 *     description: Retrieve the industries section content
 *     tags: [Landing Page]
 *     responses:
 *       200:
 *         description: Industries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Industry'
 *       500:
 *         description: Server error
 */
router.get('/industries', getIndustries);

/**
 * @swagger
 * /api/landing/industries:
 *   post:
 *     summary: Create industries section
 *     description: Create new industries section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Industry'
 *     responses:
 *       201:
 *         description: Industries created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/industries', authenticateToken, createIndustries);

/**
 * @swagger
 * /api/landing/industries:
 *   patch:
 *     summary: Update industries section
 *     description: Update existing industries section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Industry'
 *     responses:
 *       200:
 *         description: Industries updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/industries', authenticateToken, updateIndustries);

/**
 * @swagger
 * /api/landing/industries:
 *   delete:
 *     summary: Delete industries section
 *     description: Delete the industries section content
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Industries deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/industries', authenticateToken, deleteIndustries);

/**
 * @swagger
 * /api/landing/all:
 *   get:
 *     summary: Get complete landing page
 *     description: Retrieve all landing page sections in a single response (hero, services, testimonials, industries)
 *     tags: [Landing Page]
 *     responses:
 *       200:
 *         description: Complete landing page content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hero:
 *                   $ref: '#/components/schemas/Hero'
 *                 services:
 *                   $ref: '#/components/schemas/ServiceSection'
 *                 testimonials:
 *                   $ref: '#/components/schemas/Testimonial'
 *                 industries:
 *                   $ref: '#/components/schemas/Industry'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/all', getLandingPage);

export default router;