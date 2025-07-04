import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  number: String,
  title: String,
  description: String
});

const whyChooseSectionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  features: [featureSchema]
});

export default mongoose.model('WhyChooseSection', whyChooseSectionSchema);