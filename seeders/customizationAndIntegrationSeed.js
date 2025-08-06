import mongoose from 'mongoose';
import Customization from '../models/customizationModel.js';
import Integration from '../models/integrationModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleCustomizations = [
  {
    name: "NetSuite Customization & Development",
    slug: "netsuite-customization-development",
    description: "Expert NetSuite customization services to tailor your system to unique business requirements",
    isActive: true,
    customizationPage: {
      hero: {
        title: "NetSuite Customization & Development",
        description: "Tailor NetSuite to fit your unique business processes and requirements with our expert customization services.",
        ctaButton: {
          text: "Talk to an Expert",
          icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        }
      },
      services: {
        title: "Our <span>Customization Services</span>",
        description: "Transform your NetSuite experience with our comprehensive customization solutions designed to meet your unique business requirements.",
        items: [
          {
            title: "Custom Workflows",
            description: "Design automated workflows that match your business processes and improve operational efficiency",
            gradient: "from-blue-400 to-blue-600"
          },
          {
            title: "Custom Fields & Forms",
            description: "Create custom fields and forms to capture your specific data requirements seamlessly",
            gradient: "from-blue-500 to-blue-700"
          },
          {
            title: "SuiteScript Development",
            description: "Advanced scripting solutions to extend NetSuite functionality beyond standard capabilities",
            gradient: "from-blue-600 to-blue-800"
          },
          {
            title: "Custom Reports & Dashboards",
            description: "Build tailored reports and interactive dashboards for better business insights and decision-making",
            gradient: "from-blue-300 to-blue-500"
          },
          {
            title: "SuiteApps Development",
            description: "Develop custom applications and modules specifically designed for your NetSuite environment",
            gradient: "from-blue-700 to-blue-900"
          },
          {
            title: "Third-Party Integrations",
            description: "Connect NetSuite with external systems and applications for seamless data flow and automation",
            gradient: "from-sky-400 to-blue-600"
          }
        ],
        cta: {
          text: "Ready to customize your NetSuite experience?",
          buttonText: "Get Started Today"
        }
      },
      midCta: {
        title: "Transform Your <span>NetSuite Experience</span>",
        description: "Don't let standard NetSuite limitations hold back your business. Our expert customization team can unlock the full potential of your NetSuite system.",
        buttonText: "Schedule Consultation"
      },
      process: {
        title: "Our <span>Development Process</span>",
        steps: [
          {
            step: "1",
            title: "Requirements Analysis",
            description: "We analyze your business requirements and current NetSuite setup"
          },
          {
            step: "2",
            title: "Solution Design",
            description: "Design custom solutions that align with your business goals"
          },
          {
            step: "3",
            title: "Development & Testing",
            description: "Develop and thoroughly test all customizations"
          },
          {
            step: "4",
            title: "Deployment & Support",
            description: "Deploy solutions and provide ongoing support"
          }
        ]
      },
      faq: {
        title: "Frequently Asked <span>Questions</span>",
        description: "Get answers to common questions about NetSuite customization and development services.",
        items: [
          {
            question: "What types of NetSuite customizations can you develop?",
            answer: "We can develop a wide range of customizations including custom workflows, forms, fields, reports, dashboards, SuiteScript solutions, SuiteApps, third-party integrations, and complex business process automation. Our team handles everything from simple field additions to complex multi-module customizations."
          },
          {
            question: "How long does a typical customization project take?",
            answer: "Project timelines vary depending on complexity. Simple customizations like custom fields or basic workflows typically take 1-2 weeks. More complex projects involving SuiteScript development, integrations, or custom SuiteApps can take 4-12 weeks. We provide detailed timelines during our initial consultation."
          },
          {
            question: "Will customizations affect NetSuite upgrades?",
            answer: "Our customizations are built following NetSuite best practices to ensure compatibility with future upgrades. We use standard APIs and avoid modifications that could break during updates. We also provide testing and support during NetSuite releases to ensure everything continues working smoothly."
          },
          {
            question: "What's included in your customization pricing?",
            answer: "Our pricing includes requirements analysis, solution design, development, testing, deployment, documentation, and training. We also provide 30 days of post-deployment support. Ongoing maintenance and support packages are available separately."
          }
        ],
        cta: {
          text: "Have more questions about our customization services?",
          buttonText: "Contact Our Experts"
        }
      },
      finalCta: {
        title: "Ready to Unlock NetSuite's <span>Full Potential?</span>",
        description: "Join hundreds of businesses that have transformed their operations with our expert NetSuite customization services.",
        stats: [
          {
            value: "500+",
            label: "Custom Solutions Delivered"
          },
          {
            value: "98%",
            label: "Client Satisfaction Rate"
          },
          {
            value: "24/7",
            label: "Support Available"
          }
        ],
        buttonText: "Start Your Customization Project"
      },
      modal: {
        title: "NetSuite Customization Consultation",
        subtitle: "Let's discuss your customization needs",
        icon: "🚀",
        form: {
          title: "Get Started Today",
          subtitle: "Tell us about your NetSuite customization requirements",
          messagePlaceholder: "Describe your current NetSuite setup and what customizations you need..."
        }
      }
    }
  }
];

const sampleIntegrations = [
  {
    name: "NetSuite Integration Solutions",
    slug: "netsuite-integration-solutions",
    description: "Seamlessly connect NetSuite with your business systems for unified operations",
    isActive: true,
    heroContent: {
      title: "NetSuite Integration Solutions",
      subtitle: "Seamlessly Connect Your Business Systems",
      description: "Transform your business operations with powerful NetSuite integrations. Connect your existing systems, automate workflows, and create a unified data ecosystem that drives efficiency and growth.",
      backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    integrationTypes: {
      title: "Integration Types",
      description: "Comprehensive integration solutions for every business need",
      types: [
        {
          id: 1,
          title: "API Integrations",
          description: "Connect NetSuite with external systems through robust API development",
          icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          features: [
            "RESTful API development",
            "Real-time data synchronization",
            "Custom endpoint creation",
            "Authentication & security",
            "Error handling & logging"
          ],
          image: "/images/api-integration.jpg"
        },
        {
          id: 2,
          title: "E-commerce Integrations",
          description: "Connect your online stores with NetSuite for seamless order management",
          icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
          features: [
            "Shopify integration",
            "WooCommerce connection",
            "Order synchronization",
            "Inventory management",
            "Customer data sync"
          ],
          image: "/images/ecommerce-integration.jpg"
        },
        {
          id: 3,
          title: "CRM Integrations",
          description: "Unify customer data across your CRM and NetSuite systems",
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          features: [
            "Salesforce integration",
            "HubSpot connection",
            "Lead synchronization",
            "Opportunity tracking",
            "Contact management"
          ],
          image: "/images/crm-integration.jpg"
        },
        {
          id: 4,
          title: "Payment Gateway Integrations",
          description: "Streamline payment processing with secure gateway connections",
          icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
          features: [
            "Stripe integration",
            "PayPal connection",
            "Square integration",
            "Payment reconciliation",
            "Fraud protection"
          ],
          image: "/images/payment-integration.jpg"
        }
      ]
    },
    integrationBenefits: {
      title: "Integration Benefits",
      description: "Transform your business with powerful integration solutions",
      benefits: [
        {
          title: "Automated Workflows",
          description: "Eliminate manual data entry and reduce errors with automated processes",
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          metric: "90% Reduction"
        },
        {
          title: "Real-time Data",
          description: "Access up-to-date information across all your systems instantly",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          metric: "Real-time Sync"
        },
        {
          title: "Cost Savings",
          description: "Reduce operational costs through streamlined processes and automation",
          icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
          metric: "40% Savings"
        },
        {
          title: "Improved Efficiency",
          description: "Boost productivity with seamless data flow between systems",
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          metric: "60% Faster"
        }
      ]
    },
    integrationPlatforms: {
      title: "Supported Platforms",
      description: "Connect with the platforms you already use and trust",
      platforms: [
        {
          name: "E-commerce",
          platforms: [
            { name: "Shopify", logo: "/images/platforms/shopify.png" },
            { name: "WooCommerce", logo: "/images/platforms/woocommerce.png" },
            { name: "Magento", logo: "/images/platforms/magento.png" },
            { name: "BigCommerce", logo: "/images/platforms/bigcommerce.png" }
          ]
        },
        {
          name: "CRM Systems",
          platforms: [
            { name: "Salesforce", logo: "/images/platforms/salesforce.png" },
            { name: "HubSpot", logo: "/images/platforms/hubspot.png" },
            { name: "Pipedrive", logo: "/images/platforms/pipedrive.png" },
            { name: "Zoho CRM", logo: "/images/platforms/zoho.png" }
          ]
        },
        {
          name: "Payment Gateways",
          platforms: [
            { name: "Stripe", logo: "/images/platforms/stripe.png" },
            { name: "PayPal", logo: "/images/platforms/paypal.png" },
            { name: "Square", logo: "/images/platforms/square.png" },
            { name: "Authorize.net", logo: "/images/platforms/authorize.png" }
          ]
        },
        {
          name: "Business Tools",
          platforms: [
            { name: "QuickBooks", logo: "/images/platforms/quickbooks.png" },
            { name: "Xero", logo: "/images/platforms/xero.png" },
            { name: "Slack", logo: "/images/platforms/slack.png" },
            { name: "Microsoft 365", logo: "/images/platforms/microsoft.png" }
          ]
        }
      ]
    },
    cta: {
      title: "Ready to Integrate?",
      subtitle: "Transform your business with seamless NetSuite integrations",
      description: "Connect your systems, automate workflows, and unlock the full potential of your NetSuite investment. Our expert team will guide you through every step of the integration process.",
      buttonText: "Start Your Integration",
      features: [
        { feature: "Free consultation" },
        { feature: "Custom integration design" },
        { feature: "Expert development team" },
        { feature: "Ongoing support & maintenance" }
      ]
    }
  }
];

export const seedCustomizationDatabase = async () => {
  try {
    // Clear existing data
    await Customization.deleteMany({});
    console.log('Cleared existing customizations');

    // Insert sample data
    const createdCustomizations = await Customization.insertMany(sampleCustomizations);
    console.log(`Seeded ${createdCustomizations.length} customizations`);

  } catch (error) {
    console.error('Error seeding customization database:', error);
    process.exit(1);
  }
};

export const seedIntegrationDatabase = async () => {
  try {
    // Clear existing data
    await Integration.deleteMany({});
    console.log('Cleared existing integrations');

    // Insert sample data
    const createdIntegrations = await Integration.insertMany(sampleIntegrations);
    console.log(`Seeded ${createdIntegrations.length} integrations`);
  } catch (error) {
    console.error('Error seeding integration database:', error);
    process.exit(1);
  }
};

export const seedBothDatabases = async () => {
  try {

    // Clear existing data
    await Promise.all([
      Customization.deleteMany({}),
      Integration.deleteMany({})
    ]);
    console.log('Cleared existing customizations and integrations');

    // Insert sample data
    const [createdCustomizations, createdIntegrations] = await Promise.all([
      Customization.insertMany(sampleCustomizations),
      Integration.insertMany(sampleIntegrations)
    ]);
  } catch (error) {
    console.error('Error seeding databases:', error);
    process.exit(1);
  }
};

// Run the appropriate seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const seedType = process.argv[2];
  
  switch (seedType) {
    case 'customization':
      seedCustomizationDatabase();
      break;
    case 'integration':
      seedIntegrationDatabase();
      break;
    case 'both':
    default:
      seedBothDatabases();
      break;
  }
}