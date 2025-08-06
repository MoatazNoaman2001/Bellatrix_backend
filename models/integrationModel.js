import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema({
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
    required: true,
    trim: true 
  },
  backgroundImage: { 
    type: String,
    trim: true 
  }
});

const integrationTypeSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
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
  icon: { 
    type: String,
    trim: true 
  },
  features: [{
    type: String,
    trim: true
  }],
  image: { 
    type: String,
    trim: true 
  }
});

const integrationTypesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  types: [{ type: integrationTypeSchema }]
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
    required: true,
    trim: true 
  }
});

const integrationBenefitsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  benefits: [{ type: benefitSchema }]
});

const platformItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  logo: { 
    type: String,
    trim: true 
  }
});

const platformGroupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  platforms: [{ type: platformItemSchema }]
});

const integrationPlatformsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  platforms: [{ type: platformGroupSchema }]
});

const ctaFeatureSchema = new mongoose.Schema({
  feature: {
    type: String,
    required: true,
    trim: true
  }
});

const ctaSchema = new mongoose.Schema({
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
  buttonText: { 
    type: String, 
    required: true,
    trim: true 
  },
  features: [{ type: ctaFeatureSchema }]
});

const integrationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Integration name is required'],
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
  integrationTypes: { type: integrationTypesSchema },
  integrationBenefits: { type: integrationBenefitsSchema },
  integrationPlatforms: { type: integrationPlatformsSchema },
  cta: { type: ctaSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
integrationSchema.index({ slug: 1 });
integrationSchema.index({ name: 1 });
integrationSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
integrationSchema.pre('save', function(next) {
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
integrationSchema.methods.toPublicJSON = function() {
  const integration = this.toObject();
  delete integration.__v;
  return integration;
};

// Static methods
integrationSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

integrationSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const Integration = mongoose.model('Integration', integrationSchema);

export default Integration;