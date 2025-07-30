import Industry from '../models/industriesModel.js';
import { upload, getFileUrl } from '../middleware/multerConfig.js';
import fs from 'fs';
import path from 'path';

// Helper function to handle file uploads
const handleFileUploads = (req, industryData) => {
  const files = req.files || {};
  
  if (files.heroBackgroundImage) {
    industryData.hero = industryData.hero || {};
    industryData.hero.backgroundImage = getFileUrl(req, files.heroBackgroundImage[0].filename);
  }
  
  if (files.challengeImages && industryData.challenges?.items) {
    files.challengeImages.forEach((file, index) => {
      if (industryData.challenges.items[index]) {
        industryData.challenges.items[index].image = getFileUrl(req, file.filename);
      }
    });
  }
  
  if (files.solutionImages && industryData.solutions?.items) {
    files.solutionImages.forEach((file, index) => {
      if (industryData.solutions.items[index]) {
        industryData.solutions.items[index].image = getFileUrl(req, file.filename);
      }
    });
  }
  
  if (files.caseStudyImages && industryData.caseStudies?.items) {
    files.caseStudyImages.forEach((file, index) => {
      if (industryData.caseStudies.items[index]) {
        industryData.caseStudies.items[index].image = getFileUrl(req, file.filename);
      }
    });
  }
  
  return industryData;
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

// Get all industries
export const getAllIndustries = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    
    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };
    
    const industries = await Industry.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Industry.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: industries,
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
      message: 'Error fetching industries',
      error: error.message
    });
  }
};

// Get industry by slug
export const getIndustryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const industry = await Industry.findBySlug(slug);
    
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: 'Industry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: industry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industry',
      error: error.message
    });
  }
};

export const createIndustry = [
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'challengeImages', maxCount: 10 },
    { name: 'solutionImages', maxCount: 10 },
    { name: 'caseStudyImages', maxCount: 10 }
  ]),
  
  async (req, res) => {
    try {
      let industryData = req.body;
      
      if (typeof industryData.hero === 'string') {
        industryData.hero = JSON.parse(industryData.hero);
      }
      if (typeof industryData.stats === 'string') {
        industryData.stats = JSON.parse(industryData.stats);
      }
      if (typeof industryData.challenges === 'string') {
        industryData.challenges = JSON.parse(industryData.challenges);
      }
      if (typeof industryData.solutions === 'string') {
        industryData.solutions = JSON.parse(industryData.solutions);
      }
      if (typeof industryData.features === 'string') {
        industryData.features = JSON.parse(industryData.features);
      }
      if (typeof industryData.caseStudies === 'string') {
        industryData.caseStudies = JSON.parse(industryData.caseStudies);
      }
      if (typeof industryData.implementation === 'string') {
        industryData.implementation = JSON.parse(industryData.implementation);
      }
      if (typeof industryData.cta === 'string') {
        industryData.cta = JSON.parse(industryData.cta);
      }
      if (typeof industryData.contactModal === 'string') {
        industryData.contactModal = JSON.parse(industryData.contactModal);
      }
      
      // Handle file uploads
      industryData = handleFileUploads(req, industryData);
      
      const industry = new Industry(industryData);
      const savedIndustry = await industry.save();
      
      res.status(201).json({
        success: true,
        message: 'Industry created successfully',
        data: savedIndustry
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
        message: 'Error creating industry',
        error: error.message
      });
    }
  }
];

// Update industry (PATCH)
export const updateIndustry = [
  // Multer middleware for multiple file uploads
  upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'challengeImages', maxCount: 10 },
    { name: 'solutionImages', maxCount: 10 },
    { name: 'caseStudyImages', maxCount: 10 }
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
      
      // Find existing industry
      const existingIndustry = await Industry.findById(id);
      if (!existingIndustry) {
        // Clean up uploaded files
        if (req.files) {
          Object.values(req.files).flat().forEach(file => {
            deleteFile(file.path);
          });
        }
        return res.status(404).json({
          success: false,
          message: 'Industry not found'
        });
      }
      
      // Handle file uploads and replace old files
      if (req.files) {
        // Delete old files and set new ones
        if (req.files.heroBackgroundImage && existingIndustry.hero?.backgroundImage) {
          const oldPath = existingIndustry.hero.backgroundImage.replace(req.protocol + '://' + req.get('host'), '.');
          deleteFile(oldPath);
        }
        
        updateData = handleFileUploads(req, updateData);
      }
      
      const updatedIndustry = await Industry.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      res.status(200).json({
        success: true,
        message: 'Industry updated successfully',
        data: updatedIndustry
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
        message: 'Error updating industry',
        error: error.message
      });
    }
  }
];

// Delete industry
export const deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const industry = await Industry.findById(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: 'Industry not found'
      });
    }
    
    // Delete associated files
    const filesToDelete = [];
    
    // Collect all image URLs
    if (industry.hero?.backgroundImage) {
      filesToDelete.push(industry.hero.backgroundImage);
    }
    
    if (industry.challenges?.items) {
      industry.challenges.items.forEach(item => {
        if (item.image) filesToDelete.push(item.image);
      });
    }
    
    if (industry.solutions?.items) {
      industry.solutions.items.forEach(item => {
        if (item.image) filesToDelete.push(item.image);
      });
    }
    
    if (industry.caseStudies?.items) {
      industry.caseStudies.items.forEach(item => {
        if (item.image) filesToDelete.push(item.image);
      });
    }
    
    // Delete files from filesystem
    filesToDelete.forEach(url => {
      if (url && url.includes(req.get('host'))) {
        const filePath = url.replace(req.protocol + '://' + req.get('host'), '.');
        deleteFile(filePath);
      }
    });
    
    await Industry.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Industry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting industry',
      error: error.message
    });
  }
};

// Get industry by ID
export const getIndustryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const industry = await Industry.findById(id);
    
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: 'Industry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: industry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industry',
      error: error.message
    });
  }
};

// Toggle industry active status
export const toggleIndustryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const industry = await Industry.findById(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: 'Industry not found'
      });
    }
    
    industry.isActive = !industry.isActive;
    await industry.save();
    
    res.status(200).json({
      success: true,
      message: `Industry ${industry.isActive ? 'activated' : 'deactivated'} successfully`,
      data: industry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating industry status',
      error: error.message
    });
  }
};