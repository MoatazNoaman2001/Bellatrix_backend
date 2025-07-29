import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['video', 'audio', 'image', 'none'],
    default: "none"
  },
  url: { 
    type: String, 
    default: "",
    trim: true
  },
  fallback: { 
    type: String,
    trim: true
  },
  alt: { 
    type: String,
    trim: true
  }
});

const ctaButtonSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true,
    trim: true
  },
  url: { 
    type: String, 
    required: true,
    trim: true
  },
  variant: { 
    type: String, 
    enum: ['primary', 'secondary', 'outline'], 
    default: 'primary' 
  }
});

const heroSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  media: { type: mediaSchema },
  cta: {
    primary: { type: ctaButtonSchema },
    secondary: { type: ctaButtonSchema }
  },
  settings: {
    show: { type: Boolean, default: true },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    },
    layout: { 
      type: String, 
      enum: ['full-width', 'contained', 'split'],
      default: 'full-width' 
    }
  }
});

const benefitItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 100
  }]
});

const benefitsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: benefitItemSchema }],
  demo: {
    images: [{
      type: String,
      trim: true
    }]
  },
  settings: {
    show: { type: Boolean, default: true },
    layout: { 
      type: String, 
      enum: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
      default: 'grid-cols-3' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    }
  }
});

const painPointItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 100
  }]
});

const painPointsSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: painPointItemSchema }],
  illustration: { type: mediaSchema },
  settings: {
    show: { type: Boolean, default: false },
    layout: { 
      type: String, 
      enum: ['split', 'stacked', 'grid'],
      default: 'split' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'none' 
    }
  }
});

const moduleItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 100
  }]
});

const modulesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: moduleItemSchema }],
  settings: {
    show: { type: Boolean, default: true },
    layout: { 
      type: String, 
      enum: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
      default: 'grid-cols-3' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'dark' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    }
  }
});

const howItWorksSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 1000
  },
  steps: [{
    type: String,
    trim: true,
    maxlength: 500
  }],
  settings: {
    show: { type: Boolean, default: false },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'dark' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'glow', 'none'],
      default: 'none' 
    },
    layout: { 
      type: String, 
      enum: ['stepper', 'grid', 'list'],
      default: 'stepper' 
    }
  }
});

const useCaseItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String,
    trim: true
  }
});

const useCasesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: useCaseItemSchema }],
  illustration: { type: mediaSchema },
  settings: {
    show: { type: Boolean, default: true },
    layout: { 
      type: String, 
      enum: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'split'],
      default: 'grid-cols-4' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    }
  }
});

const workflowItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  details: { 
    type: String,
    trim: true,
    maxlength: 1000
  },
  icon: { 
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 100
  }]
});

const workflowSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  stepTitle: { 
    type: String,
    trim: true,
    maxlength: 100
  },
  items: [{ type: workflowItemSchema }],
  settings: {
    show: { type: Boolean, default: false },
    layout: { 
      type: String, 
      enum: ['stepper', 'grid', 'list'],
      default: 'stepper' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'slide', 'none'],
      default: 'none' 
    }
  }
});

const featureItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 100
  }]
});

const featuresSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: featureItemSchema }],
  settings: {
    show: { type: Boolean, default: false },
    layout: { 
      type: String, 
      enum: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
      default: 'grid-cols-3' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'none' 
    }
  }
});

const pricingPlanSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  price: { 
    type: String, 
    required: true,
    trim: true
  },
  priceNote: { 
    type: String,
    trim: true,
    maxlength: 50
  },
  features: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  cta: { type: ctaButtonSchema },
  highlight: { type: Boolean, default: false }
});

const pricingSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  plans: [{ type: pricingPlanSchema }],
  settings: {
    show: { type: Boolean, default: true },
    disclaimer: { 
      type: String,
      trim: true,
      maxlength: 300
    },
    layout: { 
      type: String, 
      enum: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
      default: 'grid-cols-3' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'dark' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'none' 
    }
  }
});

const faqItemSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 300
  },
  answer: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 1000
  }
});

const faqSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  items: [{ type: faqItemSchema }],
  settings: {
    show: { type: Boolean, default: true },
    expandMultiple: { type: Boolean, default: false },
    layout: { 
      type: String, 
      enum: ['list', 'grid', 'accordion'],
      default: 'list' 
    },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    }
  }
});

const ctaSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  subtitle: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  buttons: [{ type: ctaButtonSchema }],
  settings: {
    show: { type: Boolean, default: true },
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light' 
    },
    layout: { 
      type: String, 
      enum: ['center', 'left', 'right'],
      default: 'center' 
    },
    animation: { 
      type: String, 
      enum: ['fade-in', 'slide-up', 'slide-down', 'none'],
      default: 'fade-in' 
    }
  }
});

const demoSchema = new mongoose.Schema({
  images: [{
    type: String,
    trim: true
  }],
  settings: {
    show: { type: Boolean, default: false }
  }
});

const solutionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Solution name is required'],
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
  benefits: { type: benefitsSchema },
  painPoints: { type: painPointsSchema },
  modules: { type: modulesSchema },
  howItWorks: { type: howItWorksSchema },
  features: { type: featuresSchema },
  useCases: { type: useCasesSchema },
  workflow: { type: workflowSchema },
  pricing: { type: pricingSchema },
  faq: { type: faqSchema },
  cta: { type: ctaSchema },
  demo: { type: demoSchema },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // This automatically manages createdAt and updatedAt
});

// Indexes for better query performance
solutionSchema.index({ slug: 1 });
solutionSchema.index({ name: 1 });
solutionSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation and updatedAt
solutionSchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  
  // Update the updatedAt field (though timestamps: true handles this automatically)
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  
  next();
});

// Instance methods
solutionSchema.methods.toPublicJSON = function() {
  const solution = this.toObject();
  delete solution.__v;
  return solution;
};

// Static methods
solutionSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

solutionSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const Solution = mongoose.model('Solution', solutionSchema);

export default Solution;