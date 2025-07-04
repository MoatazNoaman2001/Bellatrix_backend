import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String
});

const ctaSectionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  ctaButton: String,
  features: [featureSchema]
});

export default mongoose.model('CtaSection', ctaSectionSchema);
