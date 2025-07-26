import express from 'express';
import { createOrUpdateServiceWithMedia, deleteService, getAllServices, getServiceBySlug, handleMediaUpload, toggleServiceStatus, updateService, updateServiceSection, updateServiceWithMedia, uploadServiceMedia } from '../controllers/ServiceController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management endpoints
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     description: Retrieve a paginated list of active services
 *     tags: [Services]
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
 *         description: Services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalServices:
 *                   type: integer
 *                   description: Total number of services
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllServices);

/**
 * @swagger
 * /api/services/{slug}:
 *   get:
 *     summary: Get service by slug
 *     description: Retrieve a specific service by its slug
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Service slug (URL-friendly identifier)
 *         example: "hr-management"
 *     responses:
 *       200:
 *         description: Service found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
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
router.get('/:slug', getServiceBySlug);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     description: Create a new service with optional media upload
 *     tags: [Services]
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
 *                 description: Service name
 *                 example: "HR Management"
 *               description:
 *                 type: string
 *                 description: Service description
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
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
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
router.post('/', authenticateToken, handleMediaUpload, createOrUpdateServiceWithMedia);

/**
 * @swagger
 * /api/services/{slug}:
 *   patch:
 *     summary: Update service
 *     description: Update service information (without media)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Service slug
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
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
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
router.patch('/:slug', authenticateToken, updateService);

/**
 * @swagger
 * /api/services/{slug}/status:
 *   patch:
 *     summary: Toggle service status
 *     description: Activate or deactivate a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Service slug
 *     responses:
 *       200:
 *         description: Service status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service activated"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Service not found
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
router.patch('/:slug/status', authenticateToken, toggleServiceStatus);

/**
 * @swagger
 * /api/services/{slug}:
 *   delete:
 *     summary: Delete service
 *     description: Permanently delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Service slug
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service removed"
 *       404:
 *         description: Service not found
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
router.delete('/:slug', authenticateToken, deleteService);

export default router;