import mongoose from 'mongoose';
import ImplementationPage from '../models/implementationModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleImplementationPage = {
  name: "Implementation",
  slug: "implementation",
  description: "Transform your business with our proven NetSuite implementation methodology and expert guidance.",
  isActive: true,
  heroSection: {
    titleParts: ["NetSuite", "Implementation", "Excellence", "Transform Your Business"],
    description: "Our proven implementation methodology ensures successful NetSuite deployment with minimal disruption to your business operations. From planning to go-live, we guide you every step of the way.",
    backgroundVideo: "/videos/implementation-hero.mp4",
    ctaButton: {
      text: "Start Your Implementation",
      icon: "M13 7l5 5m0 0l-5 5m5-5H6"
    },
    show: true
  },
  processSection: {
    title: "Our Implementation Process",
    description: "A structured approach to successful NetSuite deployment",
    phases: [
      {
        phase: "01",
        title: "Discovery & Planning",
        description: "Comprehensive analysis of your business requirements and creation of detailed implementation roadmap",
        duration: "2-3 weeks",
        deliverables: [
          "Business process analysis",
          "System requirements document",
          "Implementation timeline",
          "Resource allocation plan"
        ],
        show: true
      },
      {
        phase: "02",
        title: "System Design",
        description: "Custom configuration of NetSuite to match your business processes and requirements",
        duration: "3-4 weeks",
        deliverables: [
          "Custom field configuration",
          "Workflow design",
          "Form customization",
          "Role and permission setup"
        ],
        show: true
      },
      {
        phase: "03",
        title: "Development & Testing",
        description: "Custom development, data migration, and comprehensive testing of all functionality",
        duration: "4-6 weeks",
        deliverables: [
          "Custom scripts and workflows",
          "Data migration scripts",
          "Integration development",
          "User acceptance testing"
        ],
        show: true
      },
      {
        phase: "04",
        title: "Training & Go-Live",
        description: "User training, final testing, and successful system deployment",
        duration: "2-3 weeks",
        deliverables: [
          "User training materials",
          "Go-live checklist",
          "Production deployment",
          "Post-go-live support"
        ],
        show: true
      }
    ],
    show: true
  },
  whyChooseSection: {
    title: "Why Choose Our Implementation",
    description: "Expert NetSuite implementation that delivers results",
    benefits: [
      {
        title: "Proven Methodology",
        description: "Our structured approach has been refined over hundreds of successful implementations",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        metric: "95% Success Rate",
        show: true
      },
      {
        title: "Expert Team",
        description: "Certified NetSuite consultants with deep industry expertise",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        metric: "10+ Years Experience",
        show: true
      },
      {
        title: "Fast Deployment",
        description: "Accelerated implementation timeline without compromising quality",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        metric: "40% Faster",
        show: true
      },
      {
        title: "Ongoing Support",
        description: "Comprehensive post-implementation support and optimization",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z",
        metric: "24/7 Support",
        show: true
      }
    ],
    show: true
  },
  pricingSection: {
    title: "Implementation Packages",
    description: "Choose the package that best fits your business needs",
    packages: [
      {
        name: "Starter",
        description: "Perfect for small businesses getting started with NetSuite",
        price: "$15,000",
        duration: "8-10 weeks",
        features: [
          "Basic NetSuite setup",
          "Core module configuration",
          "Data migration (up to 5,000 records)",
          "User training (up to 5 users)",
          "30 days post-go-live support"
        ],
        recommended: false,
        show: true
      },
      {
        name: "Professional",
        description: "Comprehensive implementation for growing businesses",
        price: "$35,000",
        duration: "12-16 weeks",
        features: [
          "Full NetSuite configuration",
          "Advanced module setup",
          "Data migration (up to 25,000 records)",
          "Custom workflow development",
          "User training (up to 15 users)",
          "Integration development (up to 2 systems)",
          "90 days post-go-live support"
        ],
        recommended: true,
        show: true
      },
      {
        name: "Enterprise",
        description: "Complete solution for large enterprises",
        price: "$75,000",
        duration: "16-20 weeks",
        features: [
          "Enterprise-grade configuration",
          "All module implementation",
          "Unlimited data migration",
          "Custom development",
          "User training (unlimited users)",
          "Multiple system integrations",
          "Advanced reporting setup",
          "180 days post-go-live support"
        ],
        recommended: false,
        show: true
      }
    ],
    additionalInfo: {
      note: "All packages are customizable to fit your unique business requirements.",
      contactText: "For a custom quote or more information, Contact our team for a personalized consultation."
    },
    show: true
  },
  ctaSection: {
    title: "Ready to Transform Your Business?",
    subtitle: "Start your NetSuite implementation journey today",
    description: "Join hundreds of successful businesses that have transformed their operations with our expert NetSuite implementation services.",
    buttonText: "Get Started Today",
    features: [
      "Free consultation",
      "Custom implementation plan",
      "Expert project team",
      "Ongoing support"
    ],
    show: true
  },
  modalContent: {
    title: "Start Your Implementation",
    subtitle: "Let's discuss your NetSuite implementation needs",
    description: "Schedule a free consultation to discuss your business requirements and create a custom implementation plan.",
    formFields: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        show: true
      },
      {
        name: "contactName",
        label: "Contact Name",
        type: "text",
        required: true,
        show: true
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        show: true
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        show: true
      },
      {
        name: "companySize",
        label: "Company Size",
        type: "select",
        options: ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"],
        required: true,
        show: true
      },
      {
        name: "implementationType",
        label: "Implementation Type",
        type: "select",
        options: ["New NetSuite Implementation", "NetSuite Upgrade", "Module Addition", "Custom Development"],
        required: true,
        show: true
      }
    ],
    show: true
  }
};

export const seedImplementationDatabase = async () => {
  try {
    await ImplementationPage.deleteMany({});
    console.log('Cleared existing implementation pages');

    const createdPage = await ImplementationPage.create(sampleImplementationPage);
    console.log(`Seeded implementation page: ${createdPage.name}`);


  } catch (error) {
    console.error('Error seeding implementation database:', error);
    process.exit(1);
  }
};
