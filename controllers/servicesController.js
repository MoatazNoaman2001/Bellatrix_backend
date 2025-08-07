import ImplementationPage from '../models/implementationModel.js';
import TrainingPage from '../models/trainingModel.js';
import Consultation from '../models/consultingModel.js';
import Customization from '../models/customizationModel.js';
import Integration from '../models/integrationModel.js';

// @desc    Get all services (support and consultation)
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const [implementationPages, trainingPages, consultationPages, customizationPages, integrationPages] = await Promise.all([
      ImplementationPage.findActive(),
      TrainingPage.findActive(),
      Consultation.findActive(),
      Customization.findActive(),
      Integration.findActive()
    ]);

    console.log(`imeplemtation lenght: ${implementationPages.length}, training: ${trainingPages.length}, consultation: ${consultationPages.length}, custmozation: ${customizationPages.length}, 
      integration: ${integrationPages.length}`);
    

    const consultation = [
      ...implementationPages,
      ...trainingPages,
      ...consultationPages,
      ...customizationPages,
      ...integrationPages
    ];

    consultation.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const support = {
      title: "Technical Support Services",
      description: "Comprehensive support solutions for your business needs",
      services: [],
      contactInfo: {
        email: "support@company.com",
        phone: "+1-800-SUPPORT",
        hours: "24/7 availability",
        responseTime: "Within 2 hours"
      }
    };

    const services = {
      support,
      consultation
    };

    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: services,
      meta: {
        totalConsultationServices: consultation.length,
        implementationPages: implementationPages.length,
        trainingPages: trainingPages.length,
        consultationPages: consultationPages.length,
        customizationPages: customizationPages.length,
        integrationPages: integrationPages.length,
        supportServices: support.services.length
      }
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};