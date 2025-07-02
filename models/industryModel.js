import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  image: String
});

const industrySchema = new mongoose.Schema({
  id: String,
  label: String,
  icon: String,
  content: contentSchema
});

const sectionHeaderSchema = new mongoose.Schema({
  chipLabel: String,
  title: String,
  highlightedWord: String,
  description: String
});

const stylesSchema = new mongoose.Schema({
  blueGradient: String,
  glassBg: String
});

const industriesSchema = new mongoose.Schema({
  industries: [industrySchema],
  sectionHeader: sectionHeaderSchema,
  styles: stylesSchema
});

export default mongoose.model('Industry', industriesSchema);