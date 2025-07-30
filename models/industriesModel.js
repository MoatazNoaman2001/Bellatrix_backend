import mongoose from 'mongoose';

const buttonSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true,
    trim: true 
  },
  variant: { 
    type: String, 
    enum: ['primary', 'secondary', 'outline'], 
    default: 'primary' 
  },
  action: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const heroSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
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
  backgroundImage: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true },
  buttons: [{ type: buttonSchema }]
});

const statItemSchema = new mongoose.Schema({
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
  items: [{ type: statItemSchema }],
  show: { type: Boolean, default: true }
});

const challengeItemSchema = new mongoose.Schema({
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
  icon: { 
    type: String,
    trim: true 
  },
  impact: { 
    type: String,
    trim: true 
  },
  image: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const challengesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: challengeItemSchema }],
  show: { type: Boolean, default: true },
  autoRotate: { type: Boolean, default: false }
});

const solutionItemSchema = new mongoose.Schema({
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
  features: [{
    type: String,
    trim: true
  }],
  benefits: { 
    type: String,
    trim: true 
  },
  image: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const solutionsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: solutionItemSchema }],
  show: { type: Boolean, default: true },
  autoRotate: { type: Boolean, default: false }
});

const featureItemSchema = new mongoose.Schema({
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
  icon: { 
    type: String,
    trim: true 
  },
  benefits: [{
    type: String,
    trim: true
  }],
  show: { type: Boolean, default: true }
});

const featuresSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: featureItemSchema }],
  show: { type: Boolean, default: true }
});

const caseStudyItemSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: true,
    trim: true 
  },
  industry: { 
    type: String, 
    required: true,
    trim: true 
  },
  challenge: { 
    type: String, 
    required: true,
    trim: true 
  },
  solution: { 
    type: String, 
    required: true,
    trim: true 
  },
  results: [{
    type: String,
    trim: true
  }],
  image: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const caseStudiesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: caseStudyItemSchema }],
  show: { type: Boolean, default: true }
});

const implementationItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  duration: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String, 
    required: true,
    trim: true 
  },
  details: { 
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
  show: { type: Boolean, default: true }
});

const implementationSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  processTitle: { 
    type: String,
    trim: true 
  },
  items: [{ type: implementationItemSchema }],
  show: { type: Boolean, default: true }
});

const ctaFeatureSchema = new mongoose.Schema({
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
  icon: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const ctaSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  features: [{ type: ctaFeatureSchema }],
  buttonText: { 
    type: String, 
    required: true,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const contactModalSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const industrySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Industry name is required'],
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
  hero: { type: heroSchema },
  stats: { type: statsSchema },
  challenges: { type: challengesSchema },
  solutions: { type: solutionsSchema },
  features: { type: featuresSchema },
  caseStudies: { type: caseStudiesSchema },
  implementation: { type: implementationSchema },
  cta: { type: ctaSchema },
  contactModal: { type: contactModalSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
industrySchema.index({ slug: 1 });
industrySchema.index({ name: 1 });
industrySchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
industrySchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  
  // Update the updatedAt field
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  
  next();
});

// Instance methods
industrySchema.methods.toPublicJSON = function() {
  const industry = this.toObject();
  delete industry.__v;
  return industry;
};

// Static methods
industrySchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

industrySchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const Industry = mongoose.model('Industries', industrySchema);

export default Industry;