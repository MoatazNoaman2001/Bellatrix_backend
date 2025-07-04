import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  priceNote: String,
  isPopular: { type: Boolean, default: false },
  features: [String],
  ctaText: String
});

const additionalInfoSchema = new mongoose.Schema({
  note: String,
  contactText: String
});

const pricingSectionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  plans: [planSchema],
  additionalInfo: additionalInfoSchema
});

export default mongoose.model('PricingSection', pricingSectionSchema);