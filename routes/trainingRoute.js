import express from 'express';
const router = express.Router();
import { getTraining, createTraining, updateTraining, deleteTraining } from '../controllers/homePageConrollers/trainingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';

/**
 * @swagger
 * tags:
 *   name: Training
 *   description: Training page content management
 * 
 * components:
 *   schemas:
 *     Training:
 *       type: object
 *       properties:
 *         trainingPrograms:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "NetSuite Fundamentals"
 *               shortDescription:
 *                 type: string
 *                 example: "Core concepts and navigation basics"
 *               longDescription:
 *                 type: string
 *                 example: "This comprehensive fundamentals program introduces you to the core concepts of NetSuite"
 *               icon:
 *                 type: string
 *                 example: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
 *               media:
 *                 type: string
 *                 example: "/Uploads/training-fundamentals.jpg"
 *         trainingFeatures:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Expert Instructors"
 *               shortDescription:
 *                 type: string
 *                 example: "Certified professionals with years of experience"
 *               detailedDescription:
 *                 type: string
 *                 example: "Our instructors are certified NetSuite professionals with extensive real-world experience"
 *               benefits:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Industry-proven expertise with 10+ years of NetSuite experience", "Multiple NetSuite certifications"]
 *               statistics:
 *                 type: object
 *                 properties:
 *                   experience:
 *                     type: string
 *                     example: "10+ Years Average"
 *                   certifications:
 *                     type: string
 *                     example: "5+ Per Instructor"
 *                   projectsCompleted:
 *                     type: string
 *                     example: "500+ Projects"
 *                   studentsSatisfaction:
 *                     type: string
 *                     example: "98% Rating"
 *               icon:
 *                 type: string
 *                 example: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
 *               media:
 *                 type: string
 *                 example: "/Uploads/expert-instructors.jpg"
 *         keyModules:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "System Architecture"
 *               description:
 *                 type: string
 *                 example: "Core system structure, data flow, and integration patterns"
 *               duration:
 *                 type: string
 *                 example: "8 hours"
 *               icon:
 *                 type: string
 *                 example: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
 *               media:
 *                 type: string
 *                 example: "/Uploads/system-architecture.jpg"
 *         heroContent:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Professional Training Programs"
 *             description:
 *               type: string
 *               example: "Empower your team with comprehensive training solutions designed to enhance skills and drive success"
 *             media:
 *               type: string
 *               example: "/Uploads/training-hero.mp4"
 *         programsSection:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Our Training Programs"
 *             description:
 *               type: string
 *               example: "Comprehensive training solutions designed to empower your team with the skills they need to excel"
 *         keyModulesSection:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Key Training Modules"
 *             description:
 *               type: string
 *               example: "Comprehensive curriculum designed to master NetSuite from foundation to advanced implementation"
 *         whyChooseSection:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Why Choose Our Training?"
 *             description:
 *               type: string
 *               example: "We provide world-class training solutions that combine expertise, innovation, and practical application"
 */

/**
 * @swagger
 * /api/training:
 *   get:
 *     summary: Get training page content
 *     description: Retrieve the complete training page content including programs, features, modules, and sections
 *     tags: [Training]
 *     responses:
 *       200:
 *         description: Training page content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getTraining);

/**
 * @swagger
 * /api/training:
 *   post:
 *     summary: Create training page content
 *     description: Create new training page content with optional hero content media upload
 *     tags: [Training]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               trainingPrograms:
 *                 type: string
 *                 description: JSON string of training programs array
 *                 example: '[{"id":1,"title":"NetSuite Fundamentals","shortDescription":"Core concepts and navigation basics","longDescription":"This comprehensive fundamentals program introduces you to the core concepts of NetSuite","icon":"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"}]'
 *               trainingFeatures:
 *                 type: string
 *                 description: JSON string of training features array
 *               keyModules:
 *                 type: string
 *                 description: JSON string of key modules array
 *               heroContent:
 *                 type: string
 *                 description: JSON string of hero content data
 *                 example: '{"title":"Professional Training Programs","description":"Empower your team with comprehensive training solutions"}'
 *               programsSection:
 *                 type: string
 *                 description: JSON string of programs section data
 *               keyModulesSection:
 *                 type: string
 *                 description: JSON string of key modules section data
 *               whyChooseSection:
 *                 type: string
 *                 description: JSON string of why choose section data
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Hero content media file (image or video)
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       201:
 *         description: Training page content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
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
router.post('/', authenticateToken, upload.single('media'), createTraining);

/**
 * @swagger
 * /api/training:
 *   patch:
 *     summary: Update training page content
 *     description: Update existing training page content with optional hero content media upload
 *     tags: [Training]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               trainingPrograms:
 *                 type: string
 *                 description: JSON string of updated training programs array
 *               trainingFeatures:
 *                 type: string
 *                 description: JSON string of updated training features array
 *               keyModules:
 *                 type: string
 *                 description: JSON string of updated key modules array
 *               heroContent:
 *                 type: string
 *                 description: JSON string of updated hero content data
 *               programsSection:
 *                 type: string
 *                 description: JSON string of updated programs section data
 *               keyModulesSection:
 *                 type: string
 *                 description: JSON string of updated key modules section data
 *               whyChooseSection:
 *                 type: string
 *                 description: JSON string of updated why choose section data
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: New hero content media file (image or video)
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       200:
 *         description: Training page content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
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
router.patch('/', authenticateToken, upload.single('media'), updateTraining);

/**
 * @swagger
 * /api/training:
 *   delete:
 *     summary: Delete training page content
 *     description: Delete the training page content
 *     tags: [Training]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Training page content deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/', authenticateToken, deleteTraining);

export default router;