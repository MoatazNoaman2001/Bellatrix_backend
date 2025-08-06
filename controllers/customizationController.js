import Customization from '../models/customizationModel.js';
import { upload, getFileUrl } from '../config/multerConfig.js';
import fs from 'fs';

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

// Get all customizations
export const getAllCustomizations = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    
    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    const customizations = await Customization.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Customization.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: customizations,
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
      message: 'Error fetching customizations',
      error: error.message
    });
  }
};

// Get customization by slug
export const getCustomizationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const customization = await Customization.findBySlug(slug);
    
    if (!customization) {
      return res.status(404).json({
        success: false,
        message: 'Customization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: customization
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customization',
      error: error.message
    });
  }
};

// Get customization by ID
export const getCustomizationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customization = await Customization.findById(id);
    
    if (!customization) {
      return res.status(404).json({
        success: false,
        message: 'Customization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: customization
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customization',
      error: error.message
    });
  }
};

// Create customization
export const createCustomization = async (req, res) => {
  try {
    let customizationData = req.body;
    
    // Parse JSON strings if they exist
    if (typeof customizationData.customizationPage === 'string') {
      customizationData.customizationPage = JSON.parse(customizationData.customizationPage);
    }
    
    const customization = new Customization(customizationData);
    const savedCustomization = await customization.save();
    
    res.status(201).json({
      success: true,
      message: 'Customization created successfully',
      data: savedCustomization
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating customization',
      error: error.message
    });
  }
};

// Update customization (PATCH)
export const updateCustomization = async (req, res) => {
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
    
    const updatedCustomization = await Customization.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedCustomization) {
      return res.status(404).json({
        success: false,
        message: 'Customization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Customization updated successfully',
      data: updatedCustomization
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error updating customization',
      error: error.message
    });
  }
};

// Delete customization
export const deleteCustomization = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customization = await Customization.findById(id);
    if (!customization) {
      return res.status(404).json({
        success: false,
        message: 'Customization not found'
      });
    }
    
    await Customization.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Customization deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting customization',
      error: error.message
    });
  }
};

// Toggle customization active status
export const toggleCustomizationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customization = await Customization.findById(id);
    if (!customization) {
      return res.status(404).json({
        success: false,
        message: 'Customization not found'
      });
    }
    
    customization.isActive = !customization.isActive;
    await customization.save();
    
    res.status(200).json({
      success: true,
      message: `Customization ${customization.isActive ? 'activated' : 'deactivated'} successfully`,
      data: customization
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating customization status',
      error: error.message
    });
  }
};