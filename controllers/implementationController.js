import ImplementationPage from '../models/implementationModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder = 'media';
    if (file.mimetype.startsWith('image/')) {
      subfolder = 'images';
    } else if (file.mimetype.startsWith('video/')) {
      subfolder = 'videos';
    }
    
    const dir = path.join(uploadsDir, subfolder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm|mkv/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Error: Only images (jpeg, jpg, png, gif) and videos (mp4, mov, avi, webm, mkv) are allowed!'));
};

// Multer instance
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: fileFilter
});

// Helper function to get file URL
const getFileUrl = (req, filename) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/uploads/videos/${filename}`;
};

// Helper function to delete file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// @desc    Get all implementation pages
// @route   GET /api/implementation
// @access  Public
export const getImplementationPages = async (req, res) => {
  try {
    const pages = await ImplementationPage.findActive();
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    console.error('Error fetching implementation pages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching implementation pages',
      error: error.message
    });
  }
};

// @desc    Get implementation page by slug
// @route   GET /api/implementation/:slug
// @access  Public
export const getImplementationPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const page = await ImplementationPage.findBySlug(slug);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Implementation page not found'
      });
    }

    res.status(200).json({
      success: true,
      data: page.toPublicJSON()
    });
  } catch (error) {
    console.error('Error fetching implementation page:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching implementation page',
      error: error.message
    });
  }
};

// @desc    Get implementation page by ID
// @route   GET /api/implementation/id/:id
// @access  Public
export const getImplementationPageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await ImplementationPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Implementation page not found'
      });
    }

    res.status(200).json({
      success: true,
      data: page.toPublicJSON()
    });
  } catch (error) {
    console.error('Error fetching implementation page:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching implementation page',
      error: error.message
    });
  }
};

// @desc    Create new implementation page
// @route   POST /api/implementation
// @access  Private/Admin
export const createImplementationPage = async (req, res) => {
  const uploadSingle = upload.single('backgroundVideo');
  
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    }

    try {
      const pageData = req.body;
      
      // Handle background video upload
      if (req.file) {
        const videoUrl = getFileUrl(req, req.file.filename);
        
        if (pageData.heroSection) {
          pageData.heroSection.backgroundVideo = videoUrl;
        } else {
          pageData.heroSection = { backgroundVideo: videoUrl };
        }
      }

      const newPage = new ImplementationPage(pageData);
      const savedPage = await newPage.save();

      res.status(201).json({
        success: true,
        message: 'Implementation page created successfully',
        data: savedPage.toPublicJSON()
      });
    } catch (error) {
      console.error('Error creating implementation page:', error);
      
      // Delete uploaded file if database operation fails
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: validationErrors
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({
          success: false,
          message: `Implementation page with this ${field} already exists`
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating implementation page',
        error: error.message
      });
    }
  });
};

// @desc    Update implementation page
// @route   PUT /api/implementation/:id
// @access  Private/Admin
export const updateImplementationPage = async (req, res) => {
  const uploadSingle = upload.single('backgroundVideo');
  
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    }

    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const existingPage = await ImplementationPage.findById(id);
      if (!existingPage) {
        // Delete uploaded file if page not found
        if (req.file) {
          deleteFile(req.file.path);
        }
        return res.status(404).json({
          success: false,
          message: 'Implementation page not found'
        });
      }

      let oldVideoPath = null;

      // Handle background video upload
      if (req.file) {
        // Get old video path for deletion
        if (existingPage.heroSection && existingPage.heroSection.backgroundVideo) {
          const oldVideoUrl = existingPage.heroSection.backgroundVideo;
          const filename = oldVideoUrl.split('/').pop();
          oldVideoPath = path.join(uploadsDir, 'videos', filename);
        }

        const videoUrl = getFileUrl(req, req.file.filename);
        
        if (updateData.heroSection) {
          updateData.heroSection.backgroundVideo = videoUrl;
        } else {
          updateData.heroSection = { backgroundVideo: videoUrl };
        }
      }

      const updatedPage = await ImplementationPage.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { 
          new: true, 
          runValidators: true 
        }
      );

      // Delete old video file if new one was uploaded
      if (oldVideoPath && req.file) {
        deleteFile(oldVideoPath);
      }

      res.status(200).json({
        success: true,
        message: 'Implementation page updated successfully',
        data: updatedPage.toPublicJSON()
      });
    } catch (error) {
      console.error('Error updating implementation page:', error);
      
      // Delete uploaded file if database operation fails
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: validationErrors
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({
          success: false,
          message: `Implementation page with this ${field} already exists`
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating implementation page',
        error: error.message
      });
    }
  });
};

// @desc    Delete implementation page
// @route   DELETE /api/implementation/:id
// @access  Private/Admin
export const deleteImplementationPage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await ImplementationPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Implementation page not found'
      });
    }

    // Delete associated video file
    if (page.heroSection && page.heroSection.backgroundVideo) {
      const videoUrl = page.heroSection.backgroundVideo;
      const filename = videoUrl.split('/').pop();
      const videoPath = path.join(uploadsDir, 'videos', filename);
      deleteFile(videoPath);
    }

    await ImplementationPage.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Implementation page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting implementation page:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting implementation page',
      error: error.message
    });
  }
};

// @desc    Toggle implementation page status
// @route   PATCH /api/implementation/:id/toggle-status
// @access  Private/Admin
export const toggleImplementationPageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await ImplementationPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Implementation page not found'
      });
    }

    page.isActive = !page.isActive;
    page.updatedAt = Date.now();
    
    const updatedPage = await page.save();

    res.status(200).json({
      success: true,
      message: `Implementation page ${updatedPage.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedPage.toPublicJSON()
    });
  } catch (error) {
    console.error('Error toggling implementation page status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling implementation page status',
      error: error.message
    });
  }
};

// @desc    Upload video for hero section
// @route   POST /api/implementation/upload-video
// @access  Private/Admin
export const uploadHeroVideo = async (req, res) => {
  const uploadSingle = upload.single('video');
  
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      });
    }

    try {
      const videoUrl = getFileUrl(req, req.file.filename);

      res.status(200).json({
        success: true,
        message: 'Video uploaded successfully',
        data: {
          url: videoUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      
      // Delete uploaded file if there's an error
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      res.status(500).json({
        success: false,
        message: 'Error uploading video',
        error: error.message
      });
    }
  });
};

// @desc    Delete video file
// @route   DELETE /api/implementation/delete-video/:filename
// @access  Private/Admin
export const deleteHeroVideo = async (req, res) => {
  try {
    const { filename } = req.params;
    
    const videoPath = path.join(uploadsDir, 'videos', filename);
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({
        success: false,
        message: 'Video file not found'
      });
    }

    deleteFile(videoPath);

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};