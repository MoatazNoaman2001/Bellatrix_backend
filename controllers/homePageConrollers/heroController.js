import Hero from '../../models/home/heroModel.js';
import path from 'path';

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
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    if (req.file) {
      if (!data.slides) data.slides = [{}];
      data.slides[0].media = `/Uploads/${req.file.filename}`;
    }
    const hero = new Hero(data);
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') data = JSON.parse(data);
    if (req.file) {
      if (!data.slides) data.slides = [{}];
      data.slides[0].media = `/Uploads/${req.file.filename}`;
    }
    const hero = await Hero.findOneAndUpdate({}, data, { new: true, upsert: true });
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