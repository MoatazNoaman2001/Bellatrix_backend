// seedServices.js
import mongoose from 'mongoose';
import Service from './models/ServiceSection.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleServices = [
  {
    name: "HR Management",
    slug: "hr-management",
    description: "Complete HR solution for businesses of all sizes",
    isActive: true,
    hero: {
      title: "Modern HR, Payroll & People Management",
      subtitle: "Automate HR, empower employees, and stay compliant—on one secure platform.",
      media: {
        type: "video",
        url: "https://example.com/videos/hr-platform-overview.mp4",
        fallback: "#001038",
        alt: "HR platform overview video"
      },
      cta: {
        primary: {
          text: "Request Demo",
          url: "#demo",
          variant: "primary"
        },
        secondary: {
          text: "Contact Sales",
          url: "#contact"
        }
      },
      settings: {
        show: true,
        animation: "fade-in",
        layout: "full-width"
      }
    },
    benefits: {
      title: "Why Choose Our HR Solution?",
      subtitle: "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes.",
      items: [
        {
          title: "Payroll Automation",
          description: "Automate payroll processing, tax calculations, and compliance with ease.",
          icon: "payroll",
          features: ["Tax compliance", "Auto calculations"]
        },
        {
          title: "Centralized Employee Data",
          description: "All employee records, contracts, and documents in one secure place.",
          icon: "database",
          features: ["Secure storage", "Easy access"]
        }
      ],
      demo: {
        images: [
          "https://example.com/images/hr-dashboard-1.png",
          "https://example.com/images/hr-dashboard-2.png"
        ]
      },
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "light",
        animation: "fade-in"
      }
    },
    modules: {
      title: "Product Modules",
      subtitle: "Our platform is built from modular components to cover every aspect of HR, payroll, and compliance—choose what fits your business best.",
      items: [
        {
          title: "Employee Management",
          description: "Manage profiles, roles, and lifecycle events.",
          icon: "employee",
          features: ["Profile management", "Document storage"]
        },
        {
          title: "Payroll",
          description: "End-to-end payroll with tax, benefits, and payslip generation.",
          icon: "payroll",
          features: ["Tax calculations", "Payslip generation"]
        }
      ],
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "dark",
        animation: "fade-in"
      }
    },
    pricing: {
      title: "Implementation Pricing",
      subtitle: "Choose the perfect implementation plan that fits your business needs and budget",
      plans: [
        {
          name: "Basic",
          description: "Perfect for small businesses",
          price: "$2,500",
          priceNote: "starting from",
          features: ["Basic system analysis", "Standard implementation"],
          cta: {
            text: "Get Started",
            url: "#contact",
            variant: "primary"
          },
          highlight: false
        },
        {
          name: "Enterprise",
          description: "For large organizations",
          price: "Custom",
          priceNote: "pricing",
          features: ["Enterprise-grade analysis", "Fully customized solution"],
          cta: {
            text: "Contact Sales",
            url: "#contact"
          },
          highlight: true
        }
      ],
      settings: {
        show: true,
        disclaimer: "All plans include free consultation and project scoping",
        layout: "grid-cols-3",
        theme: "dark",
        animation: "none"
      }
    }
  },
  {
    name: "Accounting Software",
    slug: "accounting-software",
    description: "Comprehensive accounting solution for businesses",
    isActive: true,
    hero: {
      title: "Smart Accounting Solution",
      subtitle: "Automate your finances with our powerful accounting platform",
      media: {
        type: "image",
        url: "https://example.com/images/accounting-hero.jpg",
        fallback: "#1a237e",
        alt: "Accounting software dashboard"
      },
      cta: {
        primary: {
          text: "Start Free Trial",
          url: "#trial",
          variant: "primary"
        }
      },
      settings: {
        show: true,
        animation: "fade-in",
        layout: "centered"
      }
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert sample data
    const createdServices = await Service.insertMany(sampleServices);
    console.log(`Seeded ${createdServices.length} services`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();