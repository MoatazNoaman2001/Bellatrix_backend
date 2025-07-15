 import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  buttonText: String,
  backgroundVideo: String
}, { _id: false });

const statSchema = new mongoose.Schema({
  value: String,
  label: String
}, { _id: false });

const missionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  missionTitle: String,
  missionDescription: String,
  stats: [statSchema],
  image: String
}, { _id: false });

const journeySectionSchema = new mongoose.Schema({
  title: String,
  description: String
}, { _id: false });

const journeySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  beginning: journeySectionSchema,
  growth: journeySectionSchema,
  today: journeySectionSchema,
  image: String
}, { _id: false });

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  bio: String,
  expertise: [String]
}, { _id: false });

const teamSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  members: [teamMemberSchema]
}, { _id: false });

const valueItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  color: String
}, { _id: false });

const valuesSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  items: [valueItemSchema]
}, { _id: false });

const differentiatorItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  stats: String
}, { _id: false });

const differentiatorsSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  items: [differentiatorItemSchema]
}, { _id: false });

const milestoneItemSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String
}, { _id: false });

const milestonesSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  items: [milestoneItemSchema]
}, { _id: false });

const ctaFeatureSchema = new mongoose.Schema({
  title: String,
  description: String
}, { _id: false });

const ctaSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  buttonText: String,
  features: [ctaFeatureSchema]
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  hero: heroSchema,
  mission: missionSchema,
  journey: journeySchema,
  team: teamSchema,
  values: valuesSchema,
  differentiators: differentiatorsSchema,
  milestones: milestonesSchema,
  cta: ctaSchema
});

export default mongoose.model('About', aboutSchema);