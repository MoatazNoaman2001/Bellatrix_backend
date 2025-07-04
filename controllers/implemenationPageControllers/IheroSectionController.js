import HeroSection from '../../models/implementation/heroModel.js';

export const getHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.findOne();
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(heroSection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.create(req.body);
    res.status(201).json(heroSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updateHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(heroSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deleteHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.findOneAndDelete();
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json({ message: 'Hero section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};