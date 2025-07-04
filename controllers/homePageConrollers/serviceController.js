import Service from '../../models/home/serviceModel.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.findOne();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createServices = async (req, res) => {
  try {
    const services = new Service(req.body);
    await services.save();
    res.status(201).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateServices = async (req, res) => {
  try {
    const services = await Service.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteServices = async (req, res) => {
  try {
    await Service.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};