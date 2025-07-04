import WhyChooseSection from '../../models/implementation/whyChooseSectionModel.js';

export const getWhyChooseSection = async (req, res) => {
  try {
    const whyChooseSection = await WhyChooseSection.findOne();
    if (!whyChooseSection) {
      return res.status(404).json({ message: 'Why choose section not found' });
    }
    res.status(200).json(whyChooseSection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createWhyChooseSection = async (req, res) => {
  try {
    const whyChooseSection = await WhyChooseSection.create(req.body);
    res.status(201).json(whyChooseSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const updateWhyChooseSection = async (req, res) => {
  try {
    const whyChooseSection = await WhyChooseSection.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
    if (!whyChooseSection) {
      return res.status(404).json({ message: 'Why choose section not found' });
    }
    res.status(200).json(whyChooseSection);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const deleteWhyChooseSection = async (req, res) => {
  try {
    const whyChooseSection = await WhyChooseSection.findOneAndDelete();
    if (!whyChooseSection) {
      return res.status(404).json({ message: 'Why choose section not found' });
    }
    res.status(200).json({ message: 'Why choose section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};