import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/authRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import landingRoutes from './routes/landingRoute.js';
import seedDatabase from './models/home/seed.js';
import implementationRoutes from './routes/implementationRoute.js';
import trainingRoutes from './routes/trainingRoute.js';
import aboutRoutes from './routes/aboutRoute.js';
import integerationRoutes from './routes/integerationRoute.js';
// import consultingRoutes from './routes/consultingRoute.js';
import payrollRoutes from './routes/payrollRoute.js';
import serviceRoute from './routes/serviceRoute.js'
import { seedServiceDatabase } from './seeders/serviceSeed.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect('mongodb://localhost:27017/Belletrix').then(()=>{
  console.log('connected to mongodb');
  seedServiceDatabase();
});

app.use('/api/auth', authRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/implementation', implementationRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/integration', integerationRoutes);
// app.use('/api/consulting', consultingRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/services', serviceRoute);

app.use(errorHandler);

app.listen(5005, () => {
  console.log(`running on 5005`);
});