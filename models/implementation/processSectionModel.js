import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  number: Number,
  title: String,
  description: String,
  icon: String
});

const processSectionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  steps: [stepSchema],
  ctaButton: String
});

export default mongoose.model('ProcessSection', processSectionSchema);