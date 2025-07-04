import mongoose from 'mongoose';

const ctaButtonSchema = new mongoose.Schema({
  text: String,
  icon: String
});

const heroSectionSchema = new mongoose.Schema({
  backgroundVideo: String,
  titleParts: [String],
  description: String,
  ctaButton: ctaButtonSchema
});

export default mongoose.model('HeroSection', heroSectionSchema);