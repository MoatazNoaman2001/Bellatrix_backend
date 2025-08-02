import mongoose from 'mongoose';

const ctaButtonSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  }
});

const heroSectionSchema = new mongoose.Schema({
  titleParts: [{
    type: String,
    trim: true
  }],
  description: { 
    type: String,
    trim: true 
  },
  backgroundVideo: { 
    type: String,
    trim: true 
  },
  ctaButton: { type: ctaButtonSchema },
  show: { type: Boolean, default: true }
});

const phaseSchema = new mongoose.Schema({
  phase: { 
    type: String, 
    required: true,
    trim: true 
  },
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
  deliverables: [{
    type: String,
    trim: true
  }],
  show: { type: Boolean, default: true }
});

const processSectionSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  phases: [{ type: phaseSchema }],
  show: { type: Boolean, default: true }
});

const benefitSchema = new mongoose.Schema({
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
  metric: { 
    type: String,
    trim: true 
  },
  show: { type: Boolean, default: true }
});

const whyChooseSectionSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  benefits: [{ type: benefitSchema }],
  show: { type: Boolean, default: true }
});

const packageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true,
    trim: true 
  },
  price: { 
    type: String,
    trim: true 
  },
  duration: { 
    type: String,
    trim: true 
  },
  features: [{
    type: String,
    trim: true
  }],
  recommended: { type: Boolean, default: false },
  show: { type: Boolean, default: true }
});

const additionalInfoSchema = new mongoose.Schema({
  note: { 
    type: String,
    trim: true 
  },
  contactText: { 
    type: String,
    trim: true 
  }
});

const pricingSectionSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  packages: [{ type: packageSchema }],
  additionalInfo: { type: additionalInfoSchema },
  show: { type: Boolean, default: true }
});

const ctaSectionSchema = new mongoose.Schema({
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
  features: [{
    type: String,
    trim: true
  }],
  show: { type: Boolean, default: true }
});

const formFieldSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  label: { 
    type: String, 
    required: true,
    trim: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['text', 'email', 'tel', 'select', 'textarea'],
    trim: true 
  },
  options: [{
    type: String,
    trim: true
  }],
  required: { type: Boolean, default: false },
  show: { type: Boolean, default: true }
});

const modalContentSchema = new mongoose.Schema({
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
  formFields: [{ type: formFieldSchema }],
  show: { type: Boolean, default: true }
});

const implementationPageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Implementation page name is required'],
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
  heroSection: { type: heroSectionSchema },
  processSection: { type: processSectionSchema },
  whyChooseSection: { type: whyChooseSectionSchema },
  pricingSection: { type: pricingSectionSchema },
  ctaSection: { type: ctaSectionSchema },
  modalContent: { type: modalContentSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
implementationPageSchema.index({ slug: 1 });
implementationPageSchema.index({ name: 1 });
implementationPageSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
implementationPageSchema.pre('save', function(next) {
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

implementationPageSchema.methods.toPublicJSON = function() {
  const implementationPage = this.toObject();
  delete implementationPage.__v;
  return implementationPage;
};

implementationPageSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

implementationPageSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const ImplementationPage = mongoose.model('ImplementationPages', implementationPageSchema);

export default ImplementationPage;