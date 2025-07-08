import mongoose from 'mongoose';

const ctaButtonSchema = new mongoose.Schema({
  text: String,
  icon: String
});

const heroSectionSchema = new mongoose.Schema({
  // media: String // Path to uploaded image or video file
  media: String, // Path to uploaded image or video file
  titleParts: [String],
  description: String,
  ctaButton: ctaButtonSchema
});

export default mongoose.model('HeroSection', heroSectionSchema);