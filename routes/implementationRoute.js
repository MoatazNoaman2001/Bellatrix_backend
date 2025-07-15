import express from 'express';
import { createHeroSection, deleteHeroSection, getHeroSection, updateHeroSection } from '../controllers/implemenationPageControllers/IheroSectionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { createProcessSection, deleteProcessSection, getProcessSection, updateProcessSection } from '../controllers/implemenationPageControllers/IprocessSectionController.js';
import { createWhyChooseSection, deleteWhyChooseSection, getWhyChooseSection, updateWhyChooseSection } from '../controllers/implemenationPageControllers/IwhySectionController.js';
import { createPricingSection, deletePricingSection, getPricingSection, updatePricingSection } from '../controllers/implemenationPageControllers/IprincingSectionContoller.js';
import { createCtaSection, deleteCtaSection, getCtaSection, updateCtaSection } from '../controllers/implemenationPageControllers/IctaSectionController.js';
import { createModalContent, deleteModalContent, getModalContent, updateModalContent } from '../controllers/implemenationPageControllers/ImodelSectionController.js';
import { upload } from '../middleware/multerConfig.js';
import { getImplementationPage } from '../controllers/implemenationPageControllers/implementationPageController.js';

const router = express.Router();

router.get('/hero', getHeroSection);
router.post('/hero', authenticateToken, upload.single('media'), createHeroSection);
router.patch('/hero', authenticateToken, upload.single('media'), updateHeroSection);
router.delete('/hero', authenticateToken, deleteHeroSection);

router.get('/process', getProcessSection);
router.post('/process', authenticateToken, createProcessSection);
router.patch('/process', authenticateToken, updateProcessSection);
router.delete('/process', authenticateToken, deleteProcessSection);

router.get('/why-choose', getWhyChooseSection);
router.post('/why-choose', authenticateToken, createWhyChooseSection);
router.patch('/why-choose', authenticateToken, updateWhyChooseSection);
router.delete('/why-choose', authenticateToken, deleteWhyChooseSection);

router.get('/pricing', getPricingSection);
router.post('/pricing', authenticateToken, createPricingSection);
router.patch('/pricing', authenticateToken, updatePricingSection);
router.delete('/pricing', authenticateToken, deletePricingSection);

router.get('/cta', getCtaSection);
router.post('/cta', authenticateToken, createCtaSection);
router.patch('/cta', authenticateToken, updateCtaSection);
router.delete('/cta', authenticateToken, deleteCtaSection);


router.get('/modal-content', getModalContent);
router.post('/modal-content', authenticateToken, createModalContent);
router.patch('/modal-content', authenticateToken, updateModalContent);
router.delete('/modal-content', authenticateToken, deleteModalContent);

router.get('/all', getImplementationPage);

export default router;




