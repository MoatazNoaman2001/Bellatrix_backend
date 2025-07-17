import mongoose from 'mongoose'


const heroSchema = new mongoose.Schema({
    title: string,
    subtitle: string,
    description: string,
    backgroundImage: string
})

const ServiceFeatureSchema = new Schema({
  feature: { type: String, required: true }
});

const ConsultingServiceSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [ServiceFeatureSchema]
});
const consultingServicesSchema = new mongoose.Schema({
    title:string,
    description: string,
    services: [ServiceDocument]
})

const IndustrySolutionSchema = new Schema({
  solution: { type: String, required: true }
});

const IndustrySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  solutions: [IndustrySolutionSchema],
  link: { type: String, required: true }
});

const IndustriesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  industries: [IndustrySchema]
});

const BenefitSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  metric: { type: String, required: true }
});

const BenefitsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [BenefitSchema]
});

const CTAFeatureSchema = new Schema({
  feature: { type: String, required: true }
});

const CTASchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  features: [CTAFeatureSchema]
});

const ConsultingModelSchema = new Schema({
  heroContent: HeroContentSchema,
  consultingServices: ConsultingServicesSchema,
  industries: IndustriesSchema,
  consultingProcess: ConsultingProcessSchema,
  benefits: BenefitsSchema,
  cta: CTASchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ConsultingModelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ConsultingModel = mongoose.model('Consulting', ConsultingModelSchema);

export default ConsultingModel