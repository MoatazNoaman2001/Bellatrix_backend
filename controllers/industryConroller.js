import Industry from '../models/industryModel.js';

export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.findOne();
    res.status(200).json(industries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createIndustries = async (req, res) => {
  try {
    const industries = new Industry(req.body);
    await industries.save();
    res.status(201).json(industries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateIndustries = async (req, res) => {
  try {
    const industries = await Industry.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(industries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteIndustries = async (req, res) => {
  try {
    await Industry.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};