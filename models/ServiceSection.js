import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['video', 'audio', 'image'], required: true },
  url: { type: String, required: true },
  fallback: { type: String },
  alt: { type: String }
});

const ctaButtonSchema = new mongoose.Schema({
  text: { type: String, required: true },
  url: { type: String, required: true },
  variant: { type: String, enum: ['primary', 'secondary', 'outline'], default: 'primary' }
});

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  media: { type: mediaSchema, required: true },
  cta: {
    primary: { type: ctaButtonSchema, required: true },
    secondary: { type: ctaButtonSchema }
  },
  settings: {
    show: { type: Boolean, default: true },
    animation: { type: String, default: 'fade-in' },
    layout: { type: String, default: 'full-width' }
  }
});

const benefitItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }]
});

const benefitsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: [{ type: benefitItemSchema, required: true }],
  demo: {
    images: [{ type: String }]
  },
  settings: {
    show: { type: Boolean, default: true },
    layout: { type: String, default: 'grid-cols-3' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'fade-in' }
  }
});

const painPointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const painPointsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: [{ type: painPointSchema }],
  illustration: { type: mediaSchema },
  settings: {
    show: { type: Boolean, default: false },
    layout: { type: String, default: 'split' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'none' }
  }
});

const moduleItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }]
});

const modulesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: [{ type: moduleItemSchema, required: true }],
  settings: {
    show: { type: Boolean, default: true },
    layout: { type: String, default: 'grid-cols-3' },
    theme: { type: String, default: 'dark' },
    animation: { type: String, default: 'fade-in' }
  }
});

const useCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
});

const useCasesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: [{ type: useCaseSchema, required: true }],
  settings: {
    show: { type: Boolean, default: true },
    layout: { type: String, default: 'grid-cols-4' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'fade-in' }
  }
});

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  priceNote: { type: String },
  features: [{ type: String, required: true }],
  cta: { type: ctaButtonSchema, required: true },
  highlight: { type: Boolean, default: false }
});

const pricingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  plans: [{ type: pricingPlanSchema, required: true }],
  settings: {
    show: { type: Boolean, default: true },
    disclaimer: { type: String },
    layout: { type: String, default: 'grid-cols-3' },
    theme: { type: String, default: 'dark' },
    animation: { type: String, default: 'none' }
  }
});

const faqItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const faqSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [{ type: faqItemSchema, required: true }],
  settings: {
    show: { type: Boolean, default: true },
    expandMultiple: { type: Boolean, default: false },
    layout: { type: String, default: 'list' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'fade-in' }
  }
});

const ctaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  buttons: [{ type: ctaButtonSchema, required: true }],
  settings: {
    show: { type: Boolean, default: true },
    theme: { type: String, default: 'light' },
    layout: { type: String, default: 'center' },
    animation: { type: String, default: 'fade-in' }
  }
});

const demoSchema = new mongoose.Schema({
  images: [{ type: String }],
  settings: {
    show: { type: Boolean, default: false }
  }
});

const serviceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { type: String },
  hero: { type: heroSchema, required: true },
  benefits: { type: benefitsSchema, required: true },
  painPoints: { type: painPointsSchema },
  modules: { type: modulesSchema },
  useCases: { type: useCasesSchema },
  pricing: { type: pricingSchema },
  faq: { type: faqSchema },
  cta: { type: ctaSchema },
  demo: { type: demoSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

serviceSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  next();
});

const Service = new mongoose.model('Services', serviceSchema);

export default Service;