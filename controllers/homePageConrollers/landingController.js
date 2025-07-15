import Hero from '../../models/home/heroModel.js';
import Service from '../../models/home/serviceModel.js';
import Testimonial from '../../models/home/testimonialModel.js';
import Industry from '../../models/home/industryModel.js';

export const getLandingPage = async (req, res) => {
  try {
    const [hero, services, testimonials, industries] = await Promise.all([
      Hero.findOne(),
      Service.findOne(),
      Testimonial.findOne(),
      Industry.findOne()
    ]);
    res.status(200).json({ hero, services, testimonials, industries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 