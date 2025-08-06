import Integration from '../models/integrationModel.js';
import { upload, getFileUrl } from '../middleware/multerConfig.js';
import fs from 'fs';

// Helper function to handle file uploads
const handleFileUploads = (req, integrationData) => {
  const files = req.files || {};

  // Handle hero background image
  if (files.heroBackgroundImage) {
    integrationData.heroContent = integrationData.heroContent || {};
    integrationData.heroContent.backgroundImage = getFileUrl(req, files.heroBackgroundImage[0].filename);
  }

  // Handle integration type images
  if (files.integrationImages && integrationData.integrationTypes?.types) {
    files.integrationImages.forEach((file, index) => {
      if (integrationData.integrationTypes.types[index]) {
        integrationData.integrationTypes.types[index].image = getFileUrl(req, file.filename);
      }
    });
  }

  // Handle platform logos
  if (files.platformLogos && integrationData.integrationPlatforms?.platforms) {
    let logoIndex = 0;
    integrationData.integrationPlatforms.platforms.forEach(group => {
      if (group.platforms) {
        group.platforms.forEach(platform => {
          if (files.platformLogos[logoIndex]) {
            platform.logo = getFileUrl(req, files.platformLogos[logoIndex].filename);
            logoIndex++;
          }
        });
      }
    });
  }

  return integrationData;
};

// Helper function to delete files
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

// Get all integrations
export const getAllIntegrations = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;

    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const integrations = await Integration.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Integration.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: integrations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching integrations',
      error: error.message
    });
  }
};

// Get integration by slug
export const getIntegrationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const integration = await Integration.findBySlug(slug);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration not found'
      });
    }

    // Delete associated files
    const filesToDelete = [];

    // Collect all image URLs
    if (integration.heroContent?.backgroundImage) {
      filesToDelete.push(integration.heroContent.backgroundImage);
    }

    if (integration.integrationTypes?.types) {
      integration.integrationTypes.types.forEach(type => {
        if (type.image) filesToDelete.push(type.image);
      });
    }

    if (integration.integrationPlatforms?.platforms) {
      integration.integrationPlatforms.platforms.forEach(group => {
        if (group.platforms) {
          group.platforms.forEach(platform => {
            if (platform.logo) filesToDelete.push(platform.logo);
          });
        }
      });
    }

    // Delete files from filesystem
    filesToDelete.forEach(url => {
      if (url && url.includes(req.get('host'))) {
        const filePath = url.replace(req.protocol + '://' + req.get('host'), '.');
        deleteFile(filePath);
      }
    });

    await Integration.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Integration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting integration',
      error: error.message
    });
  }
};

// Toggle integration active status
export const toggleIntegrationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const integration = await Integration.findById(id);
    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration not found'
      });
    }

    integration.isActive = !integration.isActive;
    await integration.save();

    res.status(200).json({
      success: true,
      message: `Integration ${integration.isActive ? 'activated' : 'deactivated'} successfully`,
      data: integration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating integration status',
      error: error.message
    });
  }
};

// Get integration by ID
export const getIntegrationById = async (req, res) => {
  try {
    const { id } = req.params;

    const integration = await Integration.findById(id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: integration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching integration',
      error: error.message
    });
  }
};

// Create integration with file uploads
export const createIntegration = [
  // Multer middleware for multiple file uploads
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'integrationImages', maxCount: 10 },
    { name: 'platformLogos', maxCount: 20 }
  ]),

  async (req, res) => {
    try {
      let integrationData = req.body;

      // Parse JSON strings if they exist
      const jsonFields = [
        'heroContent', 'integrationTypes', 'integrationBenefits',
        'integrationPlatforms', 'cta'
      ];

      jsonFields.forEach(field => {
        if (typeof integrationData[field] === 'string') {
          try {
            integrationData[field] = JSON.parse(integrationData[field]);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
      });

      // Handle file uploads
      integrationData = handleFileUploads(req, integrationData);

      const integration = new Integration(integrationData);
      const savedIntegration = await integration.save();

      res.status(201).json({
        success: true,
        message: 'Integration created successfully',
        data: savedIntegration
      });
    } catch (error) {
      // Clean up uploaded files if there's an error
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          deleteFile(file.path);
        });
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          success: false,
          message: `${field} already exists`
        });
      }

      res.status(400).json({
        success: false,
        message: 'Error creating integration',
        error: error.message
      });
    }
  }
];

// Update integration (PATCH)
export const updateIntegration = [
  // Multer middleware for multiple file uploads
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'integrationImages', maxCount: 10 },
    { name: 'platformLogos', maxCount: 20 }
  ]),

  async (req, res) => {
    try {
      const { id } = req.params;
      let updateData = req.body;

      // Parse JSON strings if they exist
      Object.keys(updateData).forEach(key => {
        if (typeof updateData[key] === 'string' && updateData[key].startsWith('{')) {
          try {
            updateData[key] = JSON.parse(updateData[key]);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
      });

      // Find existing integration
      const existingIntegration = await Integration.findById(id);
      if (!existingIntegration) {
        // Clean up uploaded files
        if (req.files) {
          Object.values(req.files).flat().forEach(file => {
            deleteFile(file.path);
          });
        }
        return res.status(404).json({
          success: false,
          message: 'Integration not found'
        });
      }

      // Handle file uploads and replace old files
      if (req.files) {
        // Delete old background image if replacing
        if (req.files.heroBackgroundImage && existingIntegration.heroContent?.backgroundImage) {
          const oldPath = existingIntegration.heroContent.backgroundImage.replace(req.protocol + '://' + req.get('host'), '.');
          deleteFile(oldPath);
        }

        updateData = handleFileUploads(req, updateData);
      }

      const updatedIntegration = await Integration.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: 'Integration updated successfully',
        data: updatedIntegration
      });
    } catch (error) {
      // Clean up uploaded files if there's an error
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          deleteFile(file.path);
        });
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          success: false,
          message: `${field} already exists`
        });
      }

      res.status(400).json({
        success: false,
        message: 'Error updating integration',
        error: error.message
      });
    }
  }
];

// Delete integration
export const deleteIntegration = async (req, res) => {
  try {
    const { id } = req.params;

    const integration = await Integration.findById(id);
    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: integration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching integration',
      error: error.message
    });
  }
};