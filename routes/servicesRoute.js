import express from 'express';
import {
  getServices,
  getConsultationServices,
  getSupportServices
} from '../controllers/servicesController.js';

const router = express.Router();

router.get('/', getServices);
router.get('/consultation', getConsultationServices);
router.get('/support', getSupportServices);

export default router;