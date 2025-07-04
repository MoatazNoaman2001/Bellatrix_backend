import CtaSection from '../ctaSectionModel.js';

export const getCtaSection = async (req, res) => {
  try {
    const ctaSection = await CtaSection.findOne();
    if (!ctaSection) {
      return res.status(404).json({ message: 'CTA section not found' });
    }
    res.status(200).json(ctaSection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createCtaSection = async (req, res) => {
  try {
    const ctaSection = await CtaSection.create(req.body);
    res.status(201).json(ctaSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updateCtaSection = async (req, res) => {
  try {
    const ctaSection = await CtaSection.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!ctaSection) {
      return res.status(404).json({ message: 'CTA section not found' });
    }
    res.status(200).json(ctaSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deleteCtaSection = async (req, res) => {
  try {
    const ctaSection = await CtaSection.findOneAndDelete();
    if (!ctaSection) {
      return res.status(404).json({ message: 'CTA section not found' });
    }
    res.status(200).json({ message: 'CTA section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};