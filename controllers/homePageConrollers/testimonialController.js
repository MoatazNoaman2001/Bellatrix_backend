import Testimonial from '../../models/home/testimonialModel.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findOne();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTestimonials = async (req, res) => {
  try {
    const testimonials = new Testimonial(req.body);
    await testimonials.save();
    res.status(201).json(testimonials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTestimonials = async (req, res) => {
  try {
    await Testimonial.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};