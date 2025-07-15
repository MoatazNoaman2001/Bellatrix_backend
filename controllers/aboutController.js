import About from '../models/aboutModel.js';
import path from 'path';

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about
        
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAbout = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    
    // Handle file upload for hero section media field only
    if (req.file) {
      if (!data.hero) data.hero = {};
      data.hero.backgroundVideo = `/Uploads/${req.file.filename}`;
    }
    
    const about = new About(data);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    
    // Handle file upload for hero section media field only
    if (req.file) {
      if (!data.hero) data.hero = {};
      data.hero.backgroundVideo = `/Uploads/${req.file.filename}`;
    }
    
    const about = await About.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    await About.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};