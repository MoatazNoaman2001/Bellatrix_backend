import HeroSection from '../../models/implementation/heroModel.js';
import ProcessSection from '../../models/implementation/processSectionModel.js';
import WhyChooseSection from '../../models/implementation/whyChooseSectionModel.js';
import PricingSection from '../../models/implementation/pricingSectionModel.js';
import CtaSection from '../../models/implementation/ctaSectionModel.js';
import ModalContent from '../../models/implementation/modalContentModel.js';

export const getImplementationPage = async (req, res) => {
  try {
    const [hero, process, whyChoose, pricing, cta, modalContent] = await Promise.all([
      HeroSection.findOne(),
      ProcessSection.findOne(),
      WhyChooseSection.findOne(),
      PricingSection.findOne(),
      CtaSection.findOne(),
      ModalContent.findOne()
    ]);
    res.status(200).json({ hero, process, whyChoose, pricing, cta, modalContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 