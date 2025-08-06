import Consultation from '../models/consultingModel.js';
import { upload, getFileUrl } from '../middleware/multerConfig.js';
import fs from 'fs';
import path from 'path';

// Helper function to handle file uploads
const handleFileUploads = (req, consultationData) => {
  const files = req.files || {};
  
  // Handle hero background image
  if (files.heroBackgroundImage) {
    consultationData.heroContent = consultationData.heroContent || {};
    consultationData.heroContent.backgroundImage = getFileUrl(req, files.heroBackgroundImage[0].filename);
  }
  
  // Handle consulting process image
  if (files.processImage) {
    consultationData.consultingProcess = consultationData.consultingProcess || {};
    consultationData.consultingProcess.image = getFileUrl(req, files.processImage[0].filename);
  }
  
  // Handle industry images
  if (files.industryImages && consultationData.industries?.industries) {
    files.industryImages.forEach((file, index) => {
      if (consultationData.industries.industries[index]) {
        consultationData.industries.industries[index].image = getFileUrl(req, file.filename);
      }
    });
  }
  
  return consultationData;
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

// Get all consultations
export const getAllConsultations = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    
    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    const consultations = await Consultation.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Consultation.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: consultations,
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
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

// Get consultation by slug
export const getConsultationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const consultation = await Consultation.findBySlug(slug);
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// Get consultation by ID
export const getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const consultation = await Consultation.findById(id);
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// Create consultation with file uploads
export const createConsultation = [
  // Multer middleware for multiple file uploads
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'processImage', maxCount: 1 },
    { name: 'industryImages', maxCount: 10 }
  ]),
  
  async (req, res) => {
    try {
      let consultationData = req.body;
      
      // Parse JSON strings if they exist
      const jsonFields = [
        'heroContent', 'consultingServices', 'industries', 
        'consultingProcess', 'benefits', 'cta'
      ];
      
      jsonFields.forEach(field => {
        if (typeof consultationData[field] === 'string') {
          try {
            consultationData[field] = JSON.parse(consultationData[field]);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
      });
      
      // Handle file uploads
      consultationData = handleFileUploads(req, consultationData);
      
      const consultation = new Consultation(consultationData);
      const savedConsultation = await consultation.save();
      
      res.status(201).json({
        success: true,
        message: 'Consultation created successfully',
        data: savedConsultation
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
        message: 'Error creating consultation',
        error: error.message
      });
    }
  }
];

// Update consultation (PATCH)
export const updateConsultation = [
  // Multer middleware for multiple file uploads
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'processImage', maxCount: 1 },
    { name: 'industryImages', maxCount: 10 }
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
      
      // Find existing consultation
      const existingConsultation = await Consultation.findById(id);
      if (!existingConsultation) {
        // Clean up uploaded files
        if (req.files) {
          Object.values(req.files).flat().forEach(file => {
            deleteFile(file.path);
          });
        }
        return res.status(404).json({
          success: false,
          message: 'Consultation not found'
        });
      }
      
      // Handle file uploads and replace old files
      if (req.files) {
        // Delete old files and set new ones
        if (req.files.heroBackgroundImage && existingConsultation.heroContent?.backgroundImage) {
          const oldPath = existingConsultation.heroContent.backgroundImage.replace(req.protocol + '://' + req.get('host'), '.');
          deleteFile(oldPath);
        }
        
        if (req.files.processImage && existingConsultation.consultingProcess?.image) {
          const oldPath = existingConsultation.consultingProcess.image.replace(req.protocol + '://' + req.get('host'), '.');
          deleteFile(oldPath);
        }
        
        updateData = handleFileUploads(req, updateData);
      }
      
      const updatedConsultation = await Consultation.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      res.status(200).json({
        success: true,
        message: 'Consultation updated successfully',
        data: updatedConsultation
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
        message: 'Error updating consultation',
        error: error.message
      });
    }
  }
];

// Delete consultation
export const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }
    
    // Delete associated files
    const filesToDelete = [];
    
    // Collect all image URLs
    if (consultation.heroContent?.backgroundImage) {
      filesToDelete.push(consultation.heroContent.backgroundImage);
    }
    
    if (consultation.consultingProcess?.image) {
      filesToDelete.push(consultation.consultingProcess.image);
    }
    
    if (consultation.industries?.industries) {
      consultation.industries.industries.forEach(industry => {
        if (industry.image) filesToDelete.push(industry.image);
      });
    }
    
    // Delete files from filesystem
    filesToDelete.forEach(url => {
      if (url && url.includes(req.get('host'))) {
        const filePath = url.replace(req.protocol + '://' + req.get('host'), '.');
        deleteFile(filePath);
      }
    });
    
    await Consultation.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting consultation',
      error: error.message
    });
  }
};

// Toggle consultation active status
export const toggleConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }
    
    consultation.isActive = !consultation.isActive;
    await consultation.save();
    
    res.status(200).json({
      success: true,
      message: `Consultation ${consultation.isActive ? 'activated' : 'deactivated'} successfully`,
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating consultation status',
      error: error.message
    });
  }
};