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

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect('mongodb://localhost:27017/Belletrix').then(()=>{
  console.log('connected to mongodb');
  
});

app.use('/api/auth', authRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/implementation', implementationRoutes);

app.use(errorHandler);

app.listen(5005, () => {
  console.log(`running on 5005`);
});