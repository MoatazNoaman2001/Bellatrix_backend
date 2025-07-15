import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  backgroundImage: String
}, { _id: false });

const integrationTypeFeatureSchema = new mongoose.Schema({
  feature: String
}, { _id: false });

const integrationTypeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  icon: String,
  features: [String],
  image: String
}, { _id: false });

const integrationTypesSchema = new mongoose.Schema({
  title: String,
  description: String,
  types: [integrationTypeSchema]
}, { _id: false });

const benefitSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  metric: String
}, { _id: false });

const integrationBenefitsSchema = new mongoose.Schema({
  title: String,
  description: String,
  benefits: [benefitSchema]
}, { _id: false });

const platformItemSchema = new mongoose.Schema({
  name: String,
  logo: String
}, { _id: false });

const platformCategorySchema = new mongoose.Schema({
  name: String,
  platforms: [platformItemSchema]
}, { _id: false });

const integrationPlatformsSchema = new mongoose.Schema({
  title: String,
  description: String,
  platforms: [platformCategorySchema]
}, { _id: false });

const ctaSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  buttonText: String,
  features: [String]
}, { _id: false });

const integrationSchema = new mongoose.Schema({
  heroContent: heroContentSchema,
  integrationTypes: integrationTypesSchema,
  integrationBenefits: integrationBenefitsSchema,
  integrationPlatforms: integrationPlatformsSchema,
  cta: ctaSchema
});

export default mongoose.model('Integration', integrationSchema);