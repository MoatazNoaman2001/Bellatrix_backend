import mongoose from 'mongoose';

const trainingProgramSchema = new mongoose.Schema({
  id: Number,
  title: String,
  shortDescription: String,
  longDescription: String,
  icon: String,
  // media: String // Path to uploaded image or video file
  media: String // Path to uploaded image or video file
}, { _id: false });

const trainingFeatureSchema = new mongoose.Schema({
  id: Number,
  title: String,
  shortDescription: String,
  detailedDescription: String,
  benefits: [String],
  statistics: mongoose.Schema.Types.Mixed,
  icon: String,
  // media: String // Path to uploaded image or video file
  media: String // Path to uploaded image or video file
}, { _id: false });

const keyModuleSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  icon: String,
  // media: String // Path to uploaded image or video file
  media: String // Path to uploaded image or video file
}, { _id: false });

const heroContentSchema = new mongoose.Schema({
  title: String,
  description: String
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  title: String,
  description: String
}, { _id: false });

const trainingSchema = new mongoose.Schema({
  trainingPrograms: [trainingProgramSchema],
  trainingFeatures: [trainingFeatureSchema],
  keyModules: [keyModuleSchema],
  heroContent: heroContentSchema,
  programsSection: sectionSchema,
  keyModulesSection: sectionSchema,
  whyChooseSection: sectionSchema
});

export default mongoose.model('Training', trainingSchema); 