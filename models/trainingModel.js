import mongoose from 'mongoose';

const trainingProgramSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  shortDescription: { 
    type: String, 
    required: true,
    trim: true 
  },
  longDescription: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  },
  features: [{
    type: String,
    trim: true
  }],
  media: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const trainingFeatureSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  shortDescription: { 
    type: String, 
    required: true,
    trim: true 
  },
  detailedDescription: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  },
  benefits: [{
    type: String,
    trim: true
  }],
  statistics: {
    experienceYears: { type: String, trim: true },
    certifications: { type: String, trim: true },
    satisfactionRate: { type: String, trim: true },
    repeatClients: { type: String, trim: true },
    customizationLevel: { type: String, trim: true },
    industrySpecific: { type: String, trim: true },
    contentRelevance: { type: String, trim: true },
    implementationRate: { type: String, trim: true },
    handsOnTime: { type: String, trim: true },
    skillRetention: { type: String, trim: true },
    immediateUse: { type: String, trim: true },
    performanceGain: { type: String, trim: true },
    supportDuration: { type: String, trim: true },
    resourceAccess: { type: String, trim: true },
    followUpSessions: { type: String, trim: true },
    satisfactionRetention: { type: String, trim: true }
  },
  media: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const keyModuleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true,
    trim: true 
  },
  duration: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  },
  media: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const heroContentSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  backgroundImage: { 
    type: String,
    trim: true 
  },
  backgroundVideo: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const sectionSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const imagesSchema = new mongoose.Schema({
  trainingHero: { 
    type: String,
    trim: true 
  },
  trainingPrograms: { 
    type: String,
    trim: true 
  },
  whyChoose: { 
    type: String,
    trim: true 
  }
});

const statsItemSchema = new mongoose.Schema({
  value: { 
    type: String, 
    required: true,
    trim: true 
  },
  label: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const statsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: statsItemSchema }],
  show: { type: Boolean, default: true }
});

const testimonialSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  position: { 
    type: String,
    trim: true 
  },
  company: { 
    type: String,
    trim: true 
  },
  testimonial: { 
    type: String, 
    required: true,
    trim: true 
  },
  rating: { 
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  avatar: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const testimonialsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: testimonialSchema }],
  show: { type: Boolean, default: true }
});

const ctaSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  buttonText: { 
    type: String,
    trim: true 
  },
  buttonAction: { 
    type: String,
    trim: true 
  },
  features: [{
    type: String,
    trim: true
  }],
  show: { type: Boolean, default: true }
});

const contactModalSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const trainingPageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Training page name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  heroContent: { type: heroContentSchema },
  programsSection: { type: sectionSchema },
  trainingPrograms: [{ type: trainingProgramSchema }],
  keyModulesSection: { type: sectionSchema },
  keyModules: [{ type: keyModuleSchema }],
  whyChooseSection: { type: sectionSchema },
  trainingFeatures: [{ type: trainingFeatureSchema }],
  images: { type: imagesSchema },
  stats: { type: statsSchema },
  testimonials: { type: testimonialsSchema },
  cta: { type: ctaSchema },
  contactModal: { type: contactModalSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
trainingPageSchema.index({ slug: 1 });
trainingPageSchema.index({ name: 1 });
trainingPageSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
trainingPageSchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }

  
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  
  next();
});

// Instance methods
trainingPageSchema.methods.toPublicJSON = function() {
  const trainingPage = this.toObject();
  delete trainingPage.__v;
  return trainingPage;
};

// Static methods
trainingPageSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

trainingPageSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const TrainingPage = mongoose.model('TrainingPages', trainingPageSchema);

export default TrainingPage;