import Service from '../models/ServiceSection.js';
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
 * @route POST/PATCH /api/services
 * @access Private/Admin
 */
export const createOrUpdateServiceWithMedia = async (req, res) => {
  try {
    let serviceData = req.body;
    
    if (req.mediaUrl) {
      const mediaSection = req.body.mediaSection || 'hero';
      serviceData[mediaSection] = serviceData[mediaSection] || {};
      serviceData[mediaSection].media = {
        type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        url: req.mediaUrl,
        fallback: req.body.fallbackColor || '#001038',
        alt: req.body.altText || 'Service media'
      };
    }

    if (req.files && req.files.length > 0) {
      const demoImages = req.files.map(file => getFileUrl(req, file.filename));
      serviceData.demo = serviceData.demo || {};
      serviceData.demo.images = demoImages;
    }

    let service;
    if (req.params.slug) {
      service = await Service.findOneAndUpdate(
        { slug: req.params.slug },
        { $set: serviceData },
        { new: true, runValidators: true }
      );
    } else {
      service = new Service(serviceData);
      await service.save();
    }
    
    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Uploads media for a specific service section
 * @route PATCH /api/services/:slug/media
 * @access Private/Admin
 */
export const uploadServiceMedia = async (req, res) => {
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

    const updatedService = await Service.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Gets all active services
 * @route GET /api/services
 * @access Public
 * @returns {Array} List of services
 */
export const getAllServices = async (req, res) => {
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
     const services = await Service.find(query)
       .select('-__v')
       .sort(sort)
       .limit(limit * 1)
       .skip((page - 1) * limit)
       .exec();
 
     // Get total count for pagination info
     const count = await Service.countDocuments(query);
 
     // Return response with pagination info
     res.json({
       services,
       totalPages: Math.ceil(count / limit),
       currentPage: page,
       totalServices: count
     });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };
  
/**
 * Gets a service by its slug
 * @route GET /api/services/:slug
 * @access Public
 */
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug }).select('-__v');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Updates a service (without media)
 * @route PATCH /api/services/:slug
 * @access Private/Admin
 */
export const updateService = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    
    let updateSlug = slug;
    if (name) {
      updateSlug = generateSlug(name);
    }
    
    const updatedService = await Service.findOneAndUpdate(
      { slug },
      { ...req.body, slug: updateSlug },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Updates a service with media
 * @route PATCH /api/services/:slug/with-media
 * @access Private/Admin
 */
export const updateServiceWithMedia = async (req, res) => {
  try {
    const { slug } = req.params;
    let serviceData = req.body;
    
    if (req.mediaUrl) {
      const mediaSection = req.body.mediaSection || 'hero';
      serviceData[mediaSection] = serviceData[mediaSection] || {};
      serviceData[mediaSection].media = {
        type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        url: req.mediaUrl,
        fallback: req.body.fallbackColor || '#001038',
        alt: req.body.altText || 'Service media'
      };
    }

    if (req.files && req.files.length > 0) {
      const demoImages = req.files.map(file => getFileUrl(req, file.filename));
      serviceData.demo = serviceData.demo || {};
      serviceData.demo.images = demoImages;
    }

    const updatedService = await Service.findOneAndUpdate(
      { slug },
      { $set: serviceData },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
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
export const updateServiceSection = async (req, res) => {
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
    
    const updatedService = await Service.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Toggles a service's active status
 * @route PATCH /api/services/:slug/status
 * @access Private/Admin
 */
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    service.isActive = !service.isActive;
    await service.save();
    
    res.json({
      message: `Service ${service.isActive ? 'activated' : 'deactivated'}`,
      isActive: service.isActive
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Deletes a service
 * @route DELETE /api/services/:slug
 * @access Private/Admin
 */
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findOneAndDelete({ slug: req.params.slug });
    
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};