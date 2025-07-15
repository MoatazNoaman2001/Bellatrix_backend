import Integration from '../models/integrationModel.js';
import path from 'path';

export const getIntegration = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    res.status(200).json(integration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createIntegration = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    
    // Handle file upload for hero section background image
    if (req.file) {
      if (!data.heroContent) data.heroContent = {};
      data.heroContent.backgroundImage = `/Uploads/${req.file.filename}`;
    }
    
    const integration = new Integration(data);
    await integration.save();
    res.status(201).json(integration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateIntegration = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    
    // Handle file upload for hero section background image
    if (req.file) {
      if (!data.heroContent) data.heroContent = {};
      data.heroContent.backgroundImage = `/Uploads/${req.file.filename}`;
    }
    
    const integration = await Integration.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.status(200).json(integration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteIntegration = async (req, res) => {
  try {
    await Integration.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};