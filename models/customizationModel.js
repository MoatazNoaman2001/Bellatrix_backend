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

const heroSchema = new mongoose.Schema({
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
  ctaButton: { type: ctaButtonSchema }
});

const serviceItemSchema = new mongoose.Schema({
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
  gradient: { 
    type: String,
    trim: true 
  }
});

const servicesSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  items: [{ type: serviceItemSchema }],
  cta: {
    text: { 
      type: String,
      trim: true 
    },
    buttonText: { 
      type: String,
      trim: true 
    }
  }
});

const midCtaSchema = new mongoose.Schema({
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
  buttonText: { 
    type: String, 
    required: true,
    trim: true 
  }
});

const processStepSchema = new mongoose.Schema({
  step: { 
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
  }
});

const processSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  steps: [{ type: processStepSchema }]
});

const faqItemSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true,
    trim: true 
  },
  answer: { 
    type: String, 
    required: true,
    trim: true 
  }
});

const faqSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  items: [{ type: faqItemSchema }],
  cta: {
    text: { 
      type: String,
      trim: true 
    },
    buttonText: { 
      type: String,
      trim: true 
    }
  }
});

const statSchema = new mongoose.Schema({
  value: { 
    type: String, 
    required: true,
    trim: true 
  },
  label: { 
    type: String, 
    required: true,
    trim: true 
  }
});

const finalCtaSchema = new mongoose.Schema({
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
  stats: [{ type: statSchema }],
  buttonText: { 
    type: String, 
    required: true,
    trim: true 
  }
});

const modalFormSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  messagePlaceholder: { 
    type: String,
    trim: true 
  }
});

const modalSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  subtitle: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String,
    trim: true 
  },
  form: { type: modalFormSchema }
});

const customizationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Customization name is required'],
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
  customizationPage: {
    hero: { type: heroSchema },
    services: { type: servicesSchema },
    midCta: { type: midCtaSchema },
    process: { type: processSchema },
    faq: { type: faqSchema },
    finalCta: { type: finalCtaSchema },
    modal: { type: modalSchema }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
customizationSchema.index({ slug: 1 });
customizationSchema.index({ name: 1 });
customizationSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
customizationSchema.pre('save', function(next) {
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
customizationSchema.methods.toPublicJSON = function() {
  const customization = this.toObject();
  delete customization.__v;
  return customization;
};

// Static methods
customizationSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

customizationSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const Customization = mongoose.model('Customization', customizationSchema);

export default Customization;