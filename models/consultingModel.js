// import mongoose from 'mongoose'


// // const heroSchema = new mongoose.Schema({
// //   title: String,
// //   subtitle: String,
// //   description: String,
// //   backgroundImage: String
// // })
// const ServiceFeatureSchema = new mongoose.Schema({
//   feature: { type: String, required: true }
// });

// const ConsultingServiceSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   icon: { type: String, required: true },
//   features: [ServiceFeatureSchema]
// });

// const IndustrySolutionSchema = new mongoose.Schema({
//   solution: { type: String, required: true }
// });

// const IndustrySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   solutions: [IndustrySolutionSchema],
//   link: { type: String, required: true }
// });

// const IndustriesSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   industries: [IndustrySchema]
// });

// const BenefitSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   metric: { type: String, required: true }
// });

// const BenefitsSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   benefits: [BenefitSchema]
// });

// const CTAFeatureSchema = new mongoose.Schema({
//   feature: { type: String, required: true }
// });

// const CTASchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subtitle: { type: String, required: true },
//   description: { type: String, required: true },
//   buttonText: { type: String, required: true },
//   features: [CTAFeatureSchema]
// });

// const ConsultingModelSchema = new mongoose.Schema({
//   heroContent: HeroContentSchema,
//   consultingServices: ConsultingServiceSchema,
//   industries: IndustriesSchema,
//   consultingProcess: ConsultingProcessSchema,
//   benefits: BenefitsSchema,
//   cta: CTASchema,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// ConsultingModelSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const ConsultingModel = mongoose.model('Consulting', ConsultingModelSchema);

// export default ConsultingModel