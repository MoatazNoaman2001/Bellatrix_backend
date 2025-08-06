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

    // Flatten implementation pages
    const flattenedImplementation = implementationPages.map(page => ({
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description,
      type: 'implementation',
      title: page.heroSection?.title || page.name,
      subtitle: page.heroSection?.subtitle || '',
      heroDescription: page.heroSection?.description || page.description,
      backgroundVideo: page.heroSection?.backgroundVideo || null,
      ctaButton: page.heroSection?.ctaButton || null,
      
      processPhases: page.processSection?.phases?.length || 0,
      processTitle: page.processSection?.title || '',
      
      benefits: page.whyChooseSection?.benefits?.map(benefit => ({
        title: benefit.title,
        description: benefit.description,
        metric: benefit.metric,
        icon: benefit.icon
      })) || [],
      
      packages: page.pricingSection?.packages?.map(pkg => ({
        name: pkg.name,
        price: pkg.price,
        duration: pkg.duration,
        recommended: pkg.recommended
      })) || [],
      
      ctaTitle: page.ctaSection?.title || '',
      ctaDescription: page.ctaSection?.description || '',
      ctaButtonText: page.ctaSection?.buttonText || '',
      ctaFeatures: page.ctaSection?.features || [],
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Flatten training pages
    const flattenedTraining = trainingPages.map(page => ({
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description,
      type: 'training',
      title: page.heroContent?.title || page.name,
      heroDescription: page.heroContent?.description || page.description,
      backgroundImage: page.heroContent?.backgroundImage || null,
      backgroundVideo: page.heroContent?.backgroundVideo || null,
      
      programsCount: page.trainingPrograms?.length || 0,
      programs: page.trainingPrograms?.map(program => ({
        id: program.id,
        title: program.title,
        shortDescription: program.shortDescription,
        icon: program.icon,
        features: program.features?.slice(0, 3) || []
      })) || [],
      
      modulesCount: page.keyModules?.length || 0,
      modules: page.keyModules?.map(module => ({
        title: module.title,
        duration: module.duration,
        icon: module.icon
      })) || [],
      
      features: page.trainingFeatures?.map(feature => ({
        id: feature.id,
        title: feature.title,
        shortDescription: feature.shortDescription,
        icon: feature.icon,
        benefits: feature.benefits?.slice(0, 3) || [],
        statistics: feature.statistics || {}
      })) || [],
      
      images: page.images || {},
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Flatten consultation pages
    const flattenedConsultations = consultationPages.map(page => ({
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description,
      type: 'consultation',
      title: page.heroContent?.title || page.name,
      subtitle: page.heroContent?.subtitle || '',
      heroDescription: page.heroContent?.description || page.description,
      backgroundImage: page.heroContent?.backgroundImage || null,
      
      servicesCount: page.consultingServices?.services?.length || 0,
      services: page.consultingServices?.services?.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features?.slice(0, 3) || []
      })) || [],
      
      industriesCount: page.industries?.industries?.length || 0,
      industries: page.industries?.industries?.map(industry => ({
        name: industry.name,
        description: industry.description,
        image: industry.image,
        solutions: industry.solutions?.slice(0, 3) || [],
        link: industry.link
      })) || [],
      
      processSteps: page.consultingProcess?.process?.length || 0,
      process: page.consultingProcess?.process?.map(step => ({
        step: step.step,
        title: step.title,
        duration: step.duration
      })) || [],
      
      benefits: page.benefits?.benefits?.map(benefit => ({
        title: benefit.title,
        description: benefit.description,
        metric: benefit.metric
      })) || [],
      
      ctaTitle: page.cta?.title || '',
      ctaDescription: page.cta?.description || '',
      ctaButtonText: page.cta?.buttonText || '',
      ctaFeatures: page.cta?.features || [],
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Flatten customization pages
    const flattenedCustomizations = customizationPages.map(page => ({
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description,
      type: 'customization',
      title: page.customizationPage?.hero?.title || page.name,
      heroDescription: page.customizationPage?.hero?.description || page.description,
      
      servicesCount: page.customizationPage?.services?.items?.length || 0,
      services: page.customizationPage?.services?.items?.map(service => ({
        title: service.title,
        description: service.description,
        gradient: service.gradient
      })) || [],
      
      processSteps: page.customizationPage?.process?.steps?.length || 0,
      process: page.customizationPage?.process?.steps?.map(step => ({
        step: step.step,
        title: step.title,
        description: step.description
      })) || [],
      
      faqCount: page.customizationPage?.faq?.items?.length || 0,
      faq: page.customizationPage?.faq?.items?.slice(0, 3) || [], // Limit to 3 for summary
      
      stats: page.customizationPage?.finalCta?.stats || [],
      
      ctaTitle: page.customizationPage?.finalCta?.title || '',
      ctaDescription: page.customizationPage?.finalCta?.description || '',
      ctaButtonText: page.customizationPage?.finalCta?.buttonText || '',
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Flatten integration pages
    const flattenedIntegrations = integrationPages.map(page => ({
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description,
      type: 'integration',
      title: page.heroContent?.title || page.name,
      subtitle: page.heroContent?.subtitle || '',
      heroDescription: page.heroContent?.description || page.description,
      backgroundImage: page.heroContent?.backgroundImage || null,
      
      integrationTypesCount: page.integrationTypes?.types?.length || 0,
      integrationTypes: page.integrationTypes?.types?.map(type => ({
        id: type.id,
        title: type.title,
        description: type.description,
        icon: type.icon,
        features: type.features?.slice(0, 3) || [],
        image: type.image
      })) || [],
      
      benefits: page.integrationBenefits?.benefits?.map(benefit => ({
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        metric: benefit.metric
      })) || [],
      
      platformsCount: page.integrationPlatforms?.platforms?.reduce((total, group) => 
        total + (group.platforms?.length || 0), 0) || 0,
      platforms: page.integrationPlatforms?.platforms?.map(group => ({
        name: group.name,
        platformCount: group.platforms?.length || 0,
        platforms: group.platforms?.slice(0, 4) || [] // Limit to 4 per group
      })) || [],
      
      ctaTitle: page.cta?.title || '',
      ctaSubtitle: page.cta?.subtitle || '',
      ctaDescription: page.cta?.description || '',
      ctaButtonText: page.cta?.buttonText || '',
      ctaFeatures: page.cta?.features || [],
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Create flattened consultation array with all service types
    const consultation = [
      ...flattenedImplementation,
      ...flattenedTraining,
      ...flattenedConsultations,
      ...flattenedCustomizations,
      ...flattenedIntegrations
    ];

    // Sort consultation array by creation date (newest first)
    consultation.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Create support object with empty services array
    const support = {
      title: "Technical Support Services",
      description: "Comprehensive support solutions for your business needs",
      services: [], // Empty array as requested
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
        implementationPages: flattenedImplementation.length,
        trainingPages: flattenedTraining.length,
        consultationPages: flattenedConsultations.length,
        customizationPages: flattenedCustomizations.length,
        integrationPages: flattenedIntegrations.length,
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