import Training from '../../models/home/trainingModel.js';

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
    const training = new Training(req.body);
    await training.save();
    res.status(201).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const training = await Training.findOneAndUpdate({}, req.body, { new: true, upsert: true });
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