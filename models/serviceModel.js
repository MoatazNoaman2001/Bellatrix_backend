import mongoose from 'mongoose';

const serviceDetailSchema = new mongoose.Schema({
  detail: String
});

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  color: String,
  details: [String],
  stats: String
});

const sectionHeaderSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  gradientText: String
});

const viewAllButtonSchema = new mongoose.Schema({
  text: String
});

const servicesSchema = new mongoose.Schema({
  services: [serviceSchema],
  sectionHeader: sectionHeaderSchema,
  viewAllButton: viewAllButtonSchema
});

export default mongoose.model('Service', servicesSchema);