import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['video', 'audio', 'image'] },
  url: { type: String },
  fallback: { type: String },
  alt: { type: String }
});

const ctaButtonSchema = new mongoose.Schema({
  text: { type: String },
  url: { type: String },
  variant: { type: String, enum: ['primary', 'secondary', 'outline'], default: 'primary' }
});

const heroSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  media: { type: mediaSchema },
  cta: {
    primary: { type: ctaButtonSchema },
    secondary: { type: ctaButtonSchema }
  },
  settings: {
    show: { type: Boolean, default: true },
    animation: { type: String, default: 'fade-in' },
    layout: { type: String, default: 'full-width' }
  }
});

const benefitItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  icon: { type: String },
  features: [{ type: String }]
});

const benefitsSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  items: [{ type: benefitItemSchema }],
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
  title: { type: String },
  description: { type: String }
});

const painPointsSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
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
  title: { type: String },
  description: { type: String },
  icon: { type: String },
  features: [{ type: String }]
});

const modulesSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  items: [{ type: moduleItemSchema }],
  settings: {
    show: { type: Boolean, default: true },
    layout: { type: String, default: 'grid-cols-3' },
    theme: { type: String, default: 'dark' },
    animation: { type: String, default: 'fade-in' }
  }
});

const useCaseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  icon: { type: String }
});

const useCasesSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  items: [{ type: useCaseSchema }],
  settings: {
    show: { type: Boolean, default: true },
    layout: { type: String, default: 'grid-cols-4' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'fade-in' }
  }
});

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: String },
  priceNote: { type: String },
  features: [{ type: String }],
  cta: { type: ctaButtonSchema },
  highlight: { type: Boolean, default: false }
});

const pricingSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  plans: [{ type: pricingPlanSchema }],
  settings: {
    show: { type: Boolean, default: true },
    disclaimer: { type: String },
    layout: { type: String, default: 'grid-cols-3' },
    theme: { type: String, default: 'dark' },
    animation: { type: String, default: 'none' }
  }
});

const faqItemSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String }
});

const faqSchema = new mongoose.Schema({
  title: { type: String },
  items: [{ type: faqItemSchema }],
  settings: {
    show: { type: Boolean, default: true },
    expandMultiple: { type: Boolean, default: false },
    layout: { type: String, default: 'list' },
    theme: { type: String, default: 'light' },
    animation: { type: String, default: 'fade-in' }
  }
});

const ctaSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  buttons: [{ type: ctaButtonSchema }],
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
  hero: { type: heroSchema },
  benefits: { type: benefitsSchema },
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