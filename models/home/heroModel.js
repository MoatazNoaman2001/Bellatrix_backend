import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  // media: String // Path to uploaded image or video file
  media: String, // Path to uploaded image or video file
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