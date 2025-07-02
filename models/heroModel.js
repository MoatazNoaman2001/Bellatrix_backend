import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  video: String,
  cta: String
});

const statSchema = new mongoose.Schema({
  value: String,
  label: String
});

const heroSchema = new mongoose.Schema({
  slides: [slideSchema],
  stats: [statSchema]
});

export default mongoose.model('Hero', heroSchema);