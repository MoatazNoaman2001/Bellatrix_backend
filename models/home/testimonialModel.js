import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: Number,
  quote: String,
  name: String,
  title: String,
  avatar: String,
  rating: Number,
  results: [String]
});

const sectionHeaderSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  gradientText: String
});

const ctaButtonSchema = new mongoose.Schema({
  text: String
});

const testimonialsSchema = new mongoose.Schema({
  testimonials: [testimonialSchema],
  sectionHeader: sectionHeaderSchema,
  ctaButton: ctaButtonSchema
});

export default mongoose.model('Testimonial', testimonialsSchema);
