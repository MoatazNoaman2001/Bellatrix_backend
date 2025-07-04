import ModalContent from '../../models/implementation/modalContentModel.js';

export const getModalContent = async (req, res) => {
  try {
    const modalContent = await ModalContent.findOne();
    if (!modalContent) {
      return res.status(404).json({ message: 'Modal content not found' });
    }
    res.status(200).json(modalContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createModalContent = async (req, res) => {
  try {
    const modalContent = await ModalContent.create(req.body);
    res.status(201).json(modalContent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updateModalContent = async (req, res) => {
  try {
    const modalContent = await ModalContent.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!modalContent) {
      return res.status(404).json({ message: 'Modal content not found' });
    }
    res.status(200).json(modalContent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deleteModalContent = async (req, res) => {
  try {
    const modalContent = await ModalContent.findOneAndDelete();
    if (!modalContent) {
      return res.status(404).json({ message: 'Modal content not found' });
    }
    res.status(200).json({ message: 'Modal content deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};