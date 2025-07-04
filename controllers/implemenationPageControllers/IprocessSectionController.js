import ProcessSection from '../../models/implementation/processSectionModel.js';

export const getProcessSection = async (req, res) => {
  try {
    const processSection = await ProcessSection.findOne();
    if (!processSection) {
      return res.status(404).json({ message: 'Process section not found' });
    }
    res.status(200).json(processSection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProcessSection = async (req, res) => {
  try {
    const processSection = await ProcessSection.create(req.body);
    res.status(201).json(processSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updateProcessSection = async (req, res) => {
  try {
    const processSection = await ProcessSection.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!processSection) {
      return res.status(404).json({ message: 'Process section not found' });
    }
    res.status(200).json(processSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deleteProcessSection = async (req, res) => {
  try {
    const processSection = await ProcessSection.findOneAndDelete();
    if (!processSection) {
      return res.status(404).json({ message: 'Process section not found' });
    }
    res.status(200).json({ message: 'Process section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};