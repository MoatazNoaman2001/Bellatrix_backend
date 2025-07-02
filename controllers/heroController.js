import Hero from '../models/heroModel.js';

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHero = async (req, res) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHero = async (req, res) => {
  try {
    await Hero.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};