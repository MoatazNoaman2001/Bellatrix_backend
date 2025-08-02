import ImplementationPage from '../models/implementationModel.js';
import TrainingPage from '../models/trainingModel.js';

// @desc    Get all services (support and consultation)
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const [implementationPages, trainingPages] = await Promise.all([
      ImplementationPage.findActive(),
      TrainingPage.findActive()
    ]);

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
      
      // CTA summary
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
      
      // Training programs summary
      programsCount: page.trainingPrograms?.length || 0,
      programs: page.trainingPrograms?.map(program => ({
        id: program.id,
        title: program.title,
        shortDescription: program.shortDescription,
        icon: program.icon,
        features: program.features?.slice(0, 3) || [] // Limit to 3 features for summary
      })) || [],
      
      // Key modules summary
      modulesCount: page.keyModules?.length || 0,
      modules: page.keyModules?.map(module => ({
        title: module.title,
        duration: module.duration,
        icon: module.icon
      })) || [],
      
      // Training features summary
      features: page.trainingFeatures?.map(feature => ({
        id: feature.id,
        title: feature.title,
        shortDescription: feature.shortDescription,
        icon: feature.icon,
        benefits: feature.benefits?.slice(0, 3) || [], // Limit to 3 benefits
        statistics: feature.statistics || {}
      })) || [],
      
      // Images
      images: page.images || {},
      
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }));

    // Create flattened consultation array with all implementation and training pages
    const consultation = [...flattenedImplementation, ...flattenedTraining];

    // Sort consultation array by creation date (newest first)
    consultation.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Create support object (placeholder - you can expand this based on your needs)
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
        implementationPages: flattenedImplementation.length,
        trainingPages: flattenedTraining.length,
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

// @desc    Get consultation services only
// @route   GET /api/services/consultation
// @access  Public
export const getConsultationServices = async (req, res) => {
  try {
    // Fetch all active implementation and training pages
    const [implementationPages, trainingPages] = await Promise.all([
      ImplementationPage.findActive(),
      TrainingPage.findActive()
    ]);

    // Create simplified flattened consultation array
    const consultation = [
      ...implementationPages.map(page => ({
        id: page._id,
        name: page.name,
        slug: page.slug,
        description: page.description,
        type: 'implementation',
        title: page.heroSection?.title || page.name,
        isActive: page.isActive
      })),
      ...trainingPages.map(page => ({
        id: page._id,
        name: page.name,
        slug: page.slug,
        description: page.description,
        type: 'training',
        title: page.heroContent?.title || page.name,
        isActive: page.isActive
      }))
    ];

    res.status(200).json({
      success: true,
      message: "Consultation services retrieved successfully",
      data: consultation,
      count: consultation.length
    });

  } catch (error) {
    console.error('Error fetching consultation services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching consultation services',
      error: error.message
    });
  }
};

// @desc    Get support services only
// @route   GET /api/services/support
// @access  Public
export const getSupportServices = async (req, res) => {
  try {
    const support = {
      title: "Technical Support Services",
      description: "Comprehensive support solutions for your business needs",
      services: [
        {
          id: 1,
          name: "24/7 Technical Support",
          description: "Round-the-clock technical assistance and troubleshooting",
          icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          features: [
            "24/7 availability",
            "Expert technicians",
            "Remote assistance",
            "Priority response"
          ]
        },
        {
          id: 2,
          name: "System Maintenance",
          description: "Regular system maintenance and optimization services",
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          features: [
            "Scheduled maintenance",
            "Performance optimization",
            "Security updates",
            "Backup management"
          ]
        },
        {
          id: 3,
          name: "Data Recovery",
          description: "Professional data recovery and backup solutions",
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          features: [
            "Emergency recovery",
            "Automated backups",
            "Cloud solutions",
            "Data protection"
          ]
        },
        {
          id: 4,
          name: "Security Monitoring",
          description: "Continuous security monitoring and threat detection",
          icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
          features: [
            "Real-time monitoring",
            "Threat detection",
            "Security reports",
            "Incident response"
          ]
        }
      ],
      contactInfo: {
        email: "support@company.com",
        phone: "+1-800-SUPPORT",
        hours: "24/7 availability",
        responseTime: "Within 2 hours"
      }
    };

    res.status(200).json({
      success: true,
      message: "Support services retrieved successfully",
      data: support
    });

  } catch (error) {
    console.error('Error fetching support services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching support services',
      error: error.message
    });
  }
};