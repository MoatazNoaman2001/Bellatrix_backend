import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/authRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import landingRoutes from './routes/landingRoute.js';
import implementationRoutes from './routes/implementationRoute.js';
import trainingRoutes from './routes/trainingRoute.js';
import aboutRoutes from './routes/aboutRoute.js';
import integerationRoutes from './routes/integerationRoute.js';
import payrollRoutes from './routes/payrollRoute.js';
import solutionRoute from './routes/solutionRoute.js'
import serviceRoute from './routes/servicesRoute.js'
import industryRoute from './routes/industriesRoute.js';
import { seedSolutionDatabase } from './seeders/solutionSeed.js';

// Swagger imports
import { specs, swaggerUi, swaggerOptions } from './swagger.js';
import { seedIndustryDatabase } from './seeders/industriesSeed.js';
import { seedImplementationDatabase } from './seeders/implementationSeed.js';

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: "Server uptime in seconds"
 */

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/implementation', implementationRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/integration', integerationRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/solutions', solutionRoute);
app.use('/api/industries', industryRoute);
app.use('/api/services', serviceRoute);

// Error handling middleware
app.use(errorHandler);

// Database connection and seeding
mongoose.connect('mongodb://localhost:27017/Belletrix').then(() => {
  console.log('Connected to MongoDB');
  seedSolutionDatabase();
  seedIndustryDatabase();
  seedImplementationDatabase();
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health check available at http://localhost:${PORT}/health`);
});