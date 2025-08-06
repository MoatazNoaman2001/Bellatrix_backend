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

const serviceFeatureSchema = new mongoose.Schema({
    feature: {
        type: String,
        required: true,
        trim: true
    }
});

const consultingServiceSchema = new mongoose.Schema({
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
    features: [{ type: serviceFeatureSchema }]
});

const consultingServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    services: [{ type: consultingServiceSchema }]
});

const industryItemSchema = new mongoose.Schema({
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
    image: {
        type: String,
        trim: true
    },
    solutions: [{
        type: String,
        trim: true
    }],
    link: {
        type: String,
        trim: true
    }
});

const industriesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    industries: [{ type: industryItemSchema }]
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
    },
    duration: {
        type: String,
        trim: true
    }
});

const consultingProcessSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    process: [{ type: processStepSchema }],
    image: {
        type: String,
        trim: true
    }
});

const benefitItemSchema = new mongoose.Schema({
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
    metric: {
        type: String,
        required: true,
        trim: true
    }
});

const benefitsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    benefits: [{ type: benefitItemSchema }]
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

const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Consultation name is required'],
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
    consultingServices: { type: consultingServicesSchema },
    industries: { type: industriesSchema },
    consultingProcess: { type: consultingProcessSchema },
    benefits: { type: benefitsSchema },
    cta: { type: ctaSchema },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Indexes for better query performance
consultationSchema.index({ slug: 1 });
consultationSchema.index({ name: 1 });
consultationSchema.index({ isActive: 1 });

// Pre-save middleware for slug generation
consultationSchema.pre('save', function (next) {
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
consultationSchema.methods.toPublicJSON = function () {
    const consultation = this.toObject();
    delete consultation.__v;
    return consultation;
};

// Static methods
consultationSchema.statics.findBySlug = function (slug) {
    return this.findOne({ slug, isActive: true });
};

consultationSchema.statics.findActive = function () {
    return this.find({ isActive: true }).sort({ createdAt: -1 });
};

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;