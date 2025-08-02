import TrainingPage from '../models/trainingModel.js';
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
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: fileFilter
});

// Helper function to get file URL
const getFileUrl = (req, filename, fileType = 'images') => {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/uploads/${fileType}/${filename}`;
};

// Helper function to delete file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// @desc    Get all training pages
// @route   GET /api/training
// @access  Public
export const getTrainingPages = async (req, res) => {
  try {
    const pages = await TrainingPage.findActive();
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    console.error('Error fetching training pages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training pages',
      error: error.message
    });
  }
};

// @desc    Get training page by slug
// @route   GET /api/training/:slug
// @access  Public
export const getTrainingPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const page = await TrainingPage.findBySlug(slug);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Training page not found'
      });
    }

    res.status(200).json({
      success: true,
      data: page.toPublicJSON()
    });
  } catch (error) {
    console.error('Error fetching training page:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training page',
      error: error.message
    });
  }
};

// @desc    Get training page by ID
// @route   GET /api/training/id/:id
// @access  Public
export const getTrainingPageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await TrainingPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Training page not found'
      });
    }

    res.status(200).json({
      success: true,
      data: page.toPublicJSON()
    });
  } catch (error) {
    console.error('Error fetching training page:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training page',
      error: error.message
    });
  }
};

// @desc    Create new training page
// @route   POST /api/training
// @access  Private/Admin
export const createTrainingPage = async (req, res) => {
  const uploadFields = upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'heroBackgroundVideo', maxCount: 1 },
    { name: 'trainingHeroImage', maxCount: 1 },
    { name: 'trainingProgramsImage', maxCount: 1 },
    { name: 'whyChooseImage', maxCount: 1 },
    { name: 'programMedia', maxCount: 10 },
    { name: 'moduleMedia', maxCount: 10 },
    { name: 'featureMedia', maxCount: 10 }
  ]);
  
  uploadFields(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    }

    try {
      const pageData = req.body;
      
      // Handle file uploads
      if (req.files) {
        // Handle hero section background media
        if (req.files.heroBackgroundImage && req.files.heroBackgroundImage[0]) {
          const imageUrl = getFileUrl(req, req.files.heroBackgroundImage[0].filename, 'images');
          if (!pageData.heroContent) pageData.heroContent = {};
          pageData.heroContent.backgroundImage = imageUrl;
        }
        
        if (req.files.heroBackgroundVideo && req.files.heroBackgroundVideo[0]) {
          const videoUrl = getFileUrl(req, req.files.heroBackgroundVideo[0].filename, 'videos');
          if (!pageData.heroContent) pageData.heroContent = {};
          pageData.heroContent.backgroundVideo = videoUrl;
        }

        // Handle images section
        if (!pageData.images) pageData.images = {};
        
        if (req.files.trainingHeroImage && req.files.trainingHeroImage[0]) {
          const imageUrl = getFileUrl(req, req.files.trainingHeroImage[0].filename, 'images');
          pageData.images.trainingHero = imageUrl;
        }
        
        if (req.files.trainingProgramsImage && req.files.trainingProgramsImage[0]) {
          const imageUrl = getFileUrl(req, req.files.trainingProgramsImage[0].filename, 'images');
          pageData.images.trainingPrograms = imageUrl;
        }
        
        if (req.files.whyChooseImage && req.files.whyChooseImage[0]) {
          const imageUrl = getFileUrl(req, req.files.whyChooseImage[0].filename, 'images');
          pageData.images.whyChoose = imageUrl;
        }

        // Handle program media
        if (req.files.programMedia && pageData.trainingPrograms) {
          const programs = Array.isArray(pageData.trainingPrograms) 
            ? pageData.trainingPrograms 
            : JSON.parse(pageData.trainingPrograms || '[]');
          
          req.files.programMedia.forEach((file, index) => {
            if (programs[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              programs[index].media = mediaUrl;
            }
          });
          pageData.trainingPrograms = programs;
        }

        // Handle module media
        if (req.files.moduleMedia && pageData.keyModules) {
          const modules = Array.isArray(pageData.keyModules) 
            ? pageData.keyModules 
            : JSON.parse(pageData.keyModules || '[]');
          
          req.files.moduleMedia.forEach((file, index) => {
            if (modules[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              modules[index].media = mediaUrl;
            }
          });
          pageData.keyModules = modules;
        }

        // Handle feature media
        if (req.files.featureMedia && pageData.trainingFeatures) {
          const features = Array.isArray(pageData.trainingFeatures) 
            ? pageData.trainingFeatures 
            : JSON.parse(pageData.trainingFeatures || '[]');
          
          req.files.featureMedia.forEach((file, index) => {
            if (features[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              features[index].media = mediaUrl;
            }
          });
          pageData.trainingFeatures = features;
        }
      }

      const newPage = new TrainingPage(pageData);
      const savedPage = await newPage.save();

      res.status(201).json({
        success: true,
        message: 'Training page created successfully',
        data: savedPage.toPublicJSON()
      });
    } catch (error) {
      console.error('Error creating training page:', error);
      
      // Delete uploaded files if database operation fails
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          deleteFile(file.path);
        });
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
          message: `Training page with this ${field} already exists`
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating training page',
        error: error.message
      });
    }
  });
};

// @desc    Update training page
// @route   PUT /api/training/:id
// @access  Private/Admin
export const updateTrainingPage = async (req, res) => {
  const uploadFields = upload.fields([
    { name: 'heroBackgroundImage', maxCount: 1 },
    { name: 'heroBackgroundVideo', maxCount: 1 },
    { name: 'trainingHeroImage', maxCount: 1 },
    { name: 'trainingProgramsImage', maxCount: 1 },
    { name: 'whyChooseImage', maxCount: 1 },
    { name: 'programMedia', maxCount: 10 },
    { name: 'moduleMedia', maxCount: 10 },
    { name: 'featureMedia', maxCount: 10 }
  ]);
  
  uploadFields(req, res, async (err) => {
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
      
      const existingPage = await TrainingPage.findById(id);
      if (!existingPage) {
        // Delete uploaded files if page not found
        if (req.files) {
          Object.values(req.files).flat().forEach(file => {
            deleteFile(file.path);
          });
        }
        return res.status(404).json({
          success: false,
          message: 'Training page not found'
        });
      }

      // Handle file uploads similar to create function
      if (req.files) {
        // Handle hero section background media
        if (req.files.heroBackgroundImage && req.files.heroBackgroundImage[0]) {
          // Delete old background image
          if (existingPage.heroContent?.backgroundImage) {
            const oldFilename = existingPage.heroContent.backgroundImage.split('/').pop();
            deleteFile(path.join(uploadsDir, 'images', oldFilename));
          }
          
          const imageUrl = getFileUrl(req, req.files.heroBackgroundImage[0].filename, 'images');
          if (!updateData.heroContent) updateData.heroContent = {};
          updateData.heroContent.backgroundImage = imageUrl;
        }
        
        if (req.files.heroBackgroundVideo && req.files.heroBackgroundVideo[0]) {
          // Delete old background video
          if (existingPage.heroContent?.backgroundVideo) {
            const oldFilename = existingPage.heroContent.backgroundVideo.split('/').pop();
            deleteFile(path.join(uploadsDir, 'videos', oldFilename));
          }
          
          const videoUrl = getFileUrl(req, req.files.heroBackgroundVideo[0].filename, 'videos');
          if (!updateData.heroContent) updateData.heroContent = {};
          updateData.heroContent.backgroundVideo = videoUrl;
        }

        // Handle images section updates
        if (!updateData.images) updateData.images = existingPage.images || {};
        
        if (req.files.trainingHeroImage && req.files.trainingHeroImage[0]) {
          // Delete old training hero image
          if (existingPage.images?.trainingHero) {
            const oldFilename = existingPage.images.trainingHero.split('/').pop();
            deleteFile(path.join(uploadsDir, 'images', oldFilename));
          }
          
          const imageUrl = getFileUrl(req, req.files.trainingHeroImage[0].filename, 'images');
          updateData.images.trainingHero = imageUrl;
        }
        
        if (req.files.trainingProgramsImage && req.files.trainingProgramsImage[0]) {
          // Delete old training programs image
          if (existingPage.images?.trainingPrograms) {
            const oldFilename = existingPage.images.trainingPrograms.split('/').pop();
            deleteFile(path.join(uploadsDir, 'images', oldFilename));
          }
          
          const imageUrl = getFileUrl(req, req.files.trainingProgramsImage[0].filename, 'images');
          updateData.images.trainingPrograms = imageUrl;
        }
        
        if (req.files.whyChooseImage && req.files.whyChooseImage[0]) {
          // Delete old why choose image
          if (existingPage.images?.whyChoose) {
            const oldFilename = existingPage.images.whyChoose.split('/').pop();
            deleteFile(path.join(uploadsDir, 'images', oldFilename));
          }
          
          const imageUrl = getFileUrl(req, req.files.whyChooseImage[0].filename, 'images');
          updateData.images.whyChoose = imageUrl;
        }

        // Handle program media updates
        if (req.files.programMedia && updateData.trainingPrograms) {
          const programs = Array.isArray(updateData.trainingPrograms) 
            ? updateData.trainingPrograms 
            : JSON.parse(updateData.trainingPrograms || '[]');
          
          // Delete old program media files
          if (existingPage.trainingPrograms) {
            existingPage.trainingPrograms.forEach(program => {
              if (program.media) {
                const filename = program.media.split('/').pop();
                const isVideo = program.media.includes('/videos/');
                const subfolder = isVideo ? 'videos' : 'images';
                deleteFile(path.join(uploadsDir, subfolder, filename));
              }
            });
          }
          
          req.files.programMedia.forEach((file, index) => {
            if (programs[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              programs[index].media = mediaUrl;
            }
          });
          updateData.trainingPrograms = programs;
        }

        // Handle module media updates
        if (req.files.moduleMedia && updateData.keyModules) {
          const modules = Array.isArray(updateData.keyModules) 
            ? updateData.keyModules 
            : JSON.parse(updateData.keyModules || '[]');
          
          // Delete old module media files
          if (existingPage.keyModules) {
            existingPage.keyModules.forEach(module => {
              if (module.media) {
                const filename = module.media.split('/').pop();
                const isVideo = module.media.includes('/videos/');
                const subfolder = isVideo ? 'videos' : 'images';
                deleteFile(path.join(uploadsDir, subfolder, filename));
              }
            });
          }
          
          req.files.moduleMedia.forEach((file, index) => {
            if (modules[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              modules[index].media = mediaUrl;
            }
          });
          updateData.keyModules = modules;
        }

        // Handle feature media updates
        if (req.files.featureMedia && updateData.trainingFeatures) {
          const features = Array.isArray(updateData.trainingFeatures) 
            ? updateData.trainingFeatures 
            : JSON.parse(updateData.trainingFeatures || '[]');
          
          // Delete old feature media files
          if (existingPage.trainingFeatures) {
            existingPage.trainingFeatures.forEach(feature => {
              if (feature.media) {
                const filename = feature.media.split('/').pop();
                const isVideo = feature.media.includes('/videos/');
                const subfolder = isVideo ? 'videos' : 'images';
                deleteFile(path.join(uploadsDir, subfolder, filename));
              }
            });
          }
          
          req.files.featureMedia.forEach((file, index) => {
            if (features[index]) {
              const isVideo = file.mimetype.startsWith('video/');
              const mediaUrl = getFileUrl(req, file.filename, isVideo ? 'videos' : 'images');
              features[index].media = mediaUrl;
            }
          });
          updateData.trainingFeatures = features;
        }
      }

      const updatedPage = await TrainingPage.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { 
          new: true, 
          runValidators: true 
        }
      );

      res.status(200).json({
        success: true,
        message: 'Training page updated successfully',
        data: updatedPage.toPublicJSON()
      });
    } catch (error) {
      console.error('Error updating training page:', error);
      
      // Delete uploaded files if database operation fails
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          deleteFile(file.path);
        });
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
          message: `Training page with this ${field} already exists`
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating training page',
        error: error.message
      });
    }
  });
};

// @desc    Delete training page
// @route   DELETE /api/training/:id
// @access  Private/Admin
export const deleteTrainingPage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await TrainingPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Training page not found'
      });
    }

    // Helper function to delete media from array
    const deleteMediaFromArray = (items, mediaField) => {
      if (items && Array.isArray(items)) {
        items.forEach(item => {
          if (item[mediaField]) {
            const filename = item[mediaField].split('/').pop();
            const isVideo = item[mediaField].includes('/videos/');
            const subfolder = isVideo ? 'videos' : 'images';
            deleteFile(path.join(uploadsDir, subfolder, filename));
          }
        });
      }
    };

    // Delete hero content media
    if (page.heroContent?.backgroundImage) {
      const filename = page.heroContent.backgroundImage.split('/').pop();
      deleteFile(path.join(uploadsDir, 'images', filename));
    }
    if (page.heroContent?.backgroundVideo) {
      const filename = page.heroContent.backgroundVideo.split('/').pop();
      deleteFile(path.join(uploadsDir, 'videos', filename));
    }

    // Delete images section files
    if (page.images) {
      if (page.images.trainingHero) {
        const filename = page.images.trainingHero.split('/').pop();
        const isVideo = page.images.trainingHero.includes('/videos/');
        const subfolder = isVideo ? 'videos' : 'images';
        deleteFile(path.join(uploadsDir, subfolder, filename));
      }
      if (page.images.trainingPrograms) {
        const filename = page.images.trainingPrograms.split('/').pop();
        deleteFile(path.join(uploadsDir, 'images', filename));
      }
      if (page.images.whyChoose) {
        const filename = page.images.whyChoose.split('/').pop();
        deleteFile(path.join(uploadsDir, 'images', filename));
      }
    }

    // Delete program media
    deleteMediaFromArray(page.trainingPrograms, 'media');
    
    // Delete module media
    deleteMediaFromArray(page.keyModules, 'media');
    
    // Delete feature media
    deleteMediaFromArray(page.trainingFeatures, 'media');

    await TrainingPage.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Training page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting training page:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting training page',
      error: error.message
    });
  }
};

// @desc    Toggle training page status
// @route   PATCH /api/training/:id/toggle-status
// @access  Private/Admin
export const toggleTrainingPageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const page = await TrainingPage.findById(id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Training page not found'
      });
    }

    page.isActive = !page.isActive;
    page.updatedAt = Date.now();
    
    const updatedPage = await page.save();

    res.status(200).json({
      success: true,
      message: `Training page ${updatedPage.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedPage.toPublicJSON()
    });
  } catch (error) {
    console.error('Error toggling training page status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling training page status',
      error: error.message
    });
  }
};

// @desc    Upload media files
// @route   POST /api/training/upload-media
// @access  Private/Admin
export const uploadTrainingMedia = async (req, res) => {
  const uploadSingle = upload.single('media');
  
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
        message: 'No media file provided'
      });
    }

    try {
      const isVideo = req.file.mimetype.startsWith('video/');
      const mediaUrl = getFileUrl(req, req.file.filename, isVideo ? 'videos' : 'images');

      res.status(200).json({
        success: true,
        message: 'Media uploaded successfully',
        data: {
          url: mediaUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
          type: isVideo ? 'video' : 'image'
        }
      });
    } catch (error) {
      console.error('Error uploading media:', error);
      
      // Delete uploaded file if there's an error
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      res.status(500).json({
        success: false,
        message: 'Error uploading media',
        error: error.message
      });
    }
  });
};

// @desc    Delete media file
// @route   DELETE /api/training/delete-media/:type/:filename
// @access  Private/Admin
export const deleteTrainingMedia = async (req, res) => {
  try {
    const { type, filename } = req.params;
    
    // Validate type
    if (!['images', 'videos'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid media type. Must be "images" or "videos"'
      });
    }
    
    const mediaPath = path.join(uploadsDir, type, filename);
    
    if (!fs.existsSync(mediaPath)) {
      return res.status(404).json({
        success: false,
        message: 'Media file not found'
      });
    }

    deleteFile(mediaPath);

    res.status(200).json({
      success: true,
      message: 'Media file deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting media file',
      error: error.message
    });
  }
};