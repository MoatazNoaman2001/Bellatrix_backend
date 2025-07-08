import Training from '../../models/home/trainingModel.js';
import path from 'path';

export const getTraining = async (req, res) => {
  try {
    const training = await Training.findOne();
    res.status(200).json(training);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTraining = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    // Handle file upload for heroContent media field only
    if (req.file) {
      if (!data.heroContent) data.heroContent = {};
      data.heroContent.media = `/Uploads/${req.file.filename}`;
    }
    const training = new Training(data);
    await training.save();
    res.status(201).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTraining = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    // Handle file upload for heroContent media field only
    if (req.file) {
      if (!data.heroContent) data.heroContent = {};
      data.heroContent.media = `/Uploads/${req.file.filename}`;
    }
    const training = await Training.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.status(200).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    await Training.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 