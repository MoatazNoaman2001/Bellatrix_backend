import express from 'express';
import { createOrUpdateSolutionWithMedia, deleteSolution, getAllSolutions, getSolutionBySlug, handleMediaUpload, toggleSolutionStatus, updateSolution, updateSolutionSection, updateSolutionWithMedia, uploadSolutionMedia } from '../controllers/SolutionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Solutions
 *   description: Solution management endpoints
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     description: Retrieve a paginated list of active services
 *     tags: [Solutions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of services per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for service name or description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, -createdAt, name, -name]
 *           default: -createdAt
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Solutions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Solution'
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalSolutions:
 *                   type: integer
 *                   description: Total number of services
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllSolutions);

/**
 * @swagger
 * /api/services/{slug}:
 *   get:
 *     summary: Get service by slug
 *     description: Retrieve a specific service by its slug
 *     tags: [Solutions]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Solution slug (URL-friendly identifier)
 *         example: "hr-management"
 *     responses:
 *       200:
 *         description: Solution found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solution'
 *       404:
 *         description: Solution not found
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
router.get('/:slug', getSolutionBySlug);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     description: Create a new service with optional media upload
 *     tags: [Solutions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Solution name
 *                 example: "HR Management"
 *               description:
 *                 type: string
 *                 description: Solution description
 *                 example: "Complete HR solution for businesses"
 *               mediaSection:
 *                 type: string
 *                 enum: [hero, benefits, modules]
 *                 description: Section to attach media to
 *                 example: "hero"
 *               altText:
 *                 type: string
 *                 description: Alt text for uploaded media
 *                 example: "HR Platform Overview"
 *               fallbackColor:
 *                 type: string
 *                 description: Fallback color for media
 *                 example: "#001038"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Media file (image or video)
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "HR Management"
 *               description:
 *                 type: string
 *                 example: "Complete HR solution"
 *               hero:
 *                 type: object
 *                 description: Hero section configuration
 *               benefits:
 *                 type: object
 *                 description: Benefits section configuration
 *               modules:
 *                 type: object
 *                 description: Modules section configuration
 *     responses:
 *       200:
 *         description: Solution created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solution'
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticateToken, handleMediaUpload, createOrUpdateSolutionWithMedia);

/**
 * @swagger
 * /api/services/{slug}:
 *   patch:
 *     summary: Update service
 *     description: Update service information (without media)
 *     tags: [Solutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Solution slug
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated HR Management"
 *               description:
 *                 type: string
 *                 example: "Updated HR solution description"
 *               hero:
 *                 type: object
 *               benefits:
 *                 type: object
 *               modules:
 *                 type: object
 *     responses:
 *       200:
 *         description: Solution updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solution'
 *       404:
 *         description: Solution not found
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:slug', authenticateToken, updateSolution);

/**
 * @swagger
 * /api/services/{slug}/status:
 *   patch:
 *     summary: Toggle service status
 *     description: Activate or deactivate a service
 *     tags: [Solutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Solution slug
 *     responses:
 *       200:
 *         description: Solution status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solution activated"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Solution not found
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
router.patch('/:slug/status', authenticateToken, toggleSolutionStatus);

/**
 * @swagger
 * /api/services/{slug}:
 *   delete:
 *     summary: Delete service
 *     description: Permanently delete a service
 *     tags: [Solutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Solution slug
 *     responses:
 *       200:
 *         description: Solution deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solution removed"
 *       404:
 *         description: Solution not found
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
router.delete('/:slug', authenticateToken, deleteSolution);

export default router;