import PricingSection from '../../models/implementation/pricingSectionModel.js';

export const getPricingSection = async (req, res) => {
  try {
    const pricingSection = await PricingSection.findOne();
    if (!pricingSection) {
      return res.status(404).json({ message: 'Pricing section not found' });
    }
    res.status(200).json(pricingSection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createPricingSection = async (req, res) => {
  try {
    const pricingSection = await PricingSection.create(req.body);
    res.status(201).json(pricingSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updatePricingSection = async (req, res) => {
  try {
    const pricingSection = await PricingSection.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!pricingSection) {
      return res.status(404).json({ message: 'Pricing section not found' });
    }
    res.status(200).json(pricingSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deletePricingSection = async (req, res) => {
  try {
    const pricingSection = await PricingSection.findOneAndDelete();
    if (!pricingSection) {
      return res.status(404).json({ message: 'Pricing section not found' });
    }
    res.status(200).json({ message: 'Pricing section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};