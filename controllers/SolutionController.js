import Solution from '../models/SolutionSection.js';
import multer from 'multer';
import { uploadMedia, getFileUrl } from '../middleware/multerConfig.js';

/**
 * Generates a URL-friendly slug from a name
 * @param {string} name - The name to convert to slug
 * @returns {string} Generated slug
 */
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

/**
 * Handles media file upload
 * @middleware
 */
export const handleMediaUpload = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      uploadMedia(req, res, (err) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            reject(new Error(`Upload error: ${err.message}`));
          } else {
            reject(err);
          }
        }
        resolve();
      });
    });

    if (req.file) {
      req.mediaUrl = getFileUrl(req, req.file.filename);
    }
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Creates or updates a service with media
 * @route POST/PATCH /api/solutions
 * @access Private/Admin
 */
export const createOrUpdateSolutionWithMedia = async (req, res) => {
  try {
    let solutionData = req.body;
    
    if (req.mediaUrl) {
      const mediaSection = req.body.mediaSection || 'hero';
      solutionData[mediaSection] = solutionData[mediaSection] || {};
      solutionData[mediaSection].media = {
        type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        url: req.mediaUrl,
        fallback: req.body.fallbackColor || '#001038',
        alt: req.body.altText || 'Solution media'
      };
    }

    if (req.files && req.files.length > 0) {
      const demoImages = req.files.map(file => getFileUrl(req, file.filename));
      solutionData.demo = solutionData.demo || {};
      solutionData.demo.images = demoImages;
    }

    let service;
    if (req.params.slug) {
      service = await Solution.findOneAndUpdate(
        { slug: req.params.slug },
        { $set: solutionData },
        { new: true, runValidators: true }
      );
    } else {
      service = new Solution(solutionData);
      await service.save();
    }
    
    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Solution Error' });
  }
};

/**
 * Uploads media for a specific service section
 * @route PATCH /api/solutions/:slug/media
 * @access Private/Admin
 */
export const uploadSolutionMedia = async (req, res) => {
  try {
    const { slug } = req.params;
    const { section, altText, fallbackColor } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const updateData = {
      [section]: {
        media: {
          type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
          url: getFileUrl(req, req.file.filename),
          fallback: fallbackColor || '#001038',
          alt: altText || `${section} media`
        }
      }
    };

    const updatedSolution = await Solution.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    );

    if (!updatedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    res.json(updatedSolution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Solution Error' });
  }
};

/**
 * Gets all active services
 * @route GET /api/solutions
 * @access Public
 * @returns {Array} List of services
 */
export const getAllSolutions = async (req, res) => {
   try {
     // Get query parameters for filtering/pagination
     const { page = 1, limit = 10, sort = '-createdAt', search = '' } = req.query;
     
     // Build the query
     const query = { isActive: true };
     
     // Add search functionality
     if (search) {
       query.$or = [
         { name: { $regex: search, $options: 'i' } },
         { description: { $regex: search, $options: 'i' } }
       ];
     }
 
     // Execute the query with pagination
     const services = await Solution.find(query)
       .select('-__v')
       .sort(sort)
       .limit(limit * 1)
       .skip((page - 1) * limit)
       .exec();
 
     // Get total count for pagination info
     const count = await Solution.countDocuments(query);
 
     // Return response with pagination info
     res.json({
       services,
       totalPages: Math.ceil(count / limit),
       currentPage: page,
       totalSolutions: count
     });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };
  
/**
 * Gets a service by its slug
 * @route GET /api/solutions/:slug
 * @access Public
 */
export const getSolutionBySlug = async (req, res) => {
  try {
    const service = await Solution.findOne({ slug: req.params.slug }).select('-__v');
    
    if (!service) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Updates a service (without media)
 * @route PATCH /api/solutions/:slug
 * @access Private/Admin
 */
export const updateSolution = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    
    let updateSlug = slug;
    if (name) {
      updateSlug = generateSlug(name);
    }
    
    const updatedSolution = await Solution.findOneAndUpdate(
      { slug },
      { ...req.body, slug: updateSlug },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    res.json(updatedSolution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Updates a service with media
 * @route PATCH /api/solutions/:slug/with-media
 * @access Private/Admin
 */
export const updateSolutionWithMedia = async (req, res) => {
  try {
    const { slug } = req.params;
    let solutionData = req.body;
    
    if (req.mediaUrl) {
      const mediaSection = req.body.mediaSection || 'hero';
      solutionData[mediaSection] = solutionData[mediaSection] || {};
      solutionData[mediaSection].media = {
        type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        url: req.mediaUrl,
        fallback: req.body.fallbackColor || '#001038',
        alt: req.body.altText || 'Solution media'
      };
    }

    if (req.files && req.files.length > 0) {
      const demoImages = req.files.map(file => getFileUrl(req, file.filename));
      solutionData.demo = solutionData.demo || {};
      solutionData.demo.images = demoImages;
    }

    const updatedSolution = await Solution.findOneAndUpdate(
      { slug },
      { $set: solutionData },
      { new: true, runValidators: true }
    );

    if (!updatedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    res.json(updatedSolution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Updates a specific section of a service
 * @route PATCH /api/services/:slug/sections/:section
 * @access Private/Admin
 */
export const updateSolutionSection = async (req, res) => {
  try {
    const { slug, section } = req.params;
    
    const validSections = [
      'hero', 'benefits', 'painPoints', 'modules', 
      'useCases', 'pricing', 'faq', 'cta', 'demo'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    const updateData = {};
    updateData[section] = req.body;
    
    const updatedSolution = await Solution.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    res.json(updatedSolution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Toggles a service's active status
 * @route PATCH /api/solution/:slug/status
 * @access Private/Admin
 */
export const toggleSolutionStatus = async (req, res) => {
  try {
    const solution = await Solution.findOne({ slug: req.params.slug });
    
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    solution.isActive = !solution.isActive;
    await solution.save();
    
    res.json({
      message: `Solution ${solution.isActive ? 'activated' : 'deactivated'}`,
      isActive: solution.isActive
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Deletes a service
 * @route DELETE /api/solutions/:slug
 * @access Private/Admin
 */
export const deleteSolution = async (req, res) => {
  try {
    const deletedSolution = await Solution.findOneAndDelete({ slug: req.params.slug });
    
    if (!deletedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    res.json({ message: 'Solution removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Solution Error' });
  }
};