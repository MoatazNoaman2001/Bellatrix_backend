import mongoose from 'mongoose';
import Industry from '../models/industriesModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleIndustries = [
  {
    name: "Retail Excellence",
    slug: "retail-excellence",
    description: "Transform your retail operations with integrated commerce solutions that unify online, mobile, and in-store experiences while optimizing inventory and enhancing customer satisfaction.",
    isActive: true,
    hero: {
      title: "Retail Excellence",
      subtitle: "Powered by NetSuite",
      description: "Transform your retail operations with integrated commerce solutions that unify online, mobile, and in-store experiences while optimizing inventory and enhancing customer satisfaction.",
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      show: true,
      buttons: [
        {
          text: "Get Retail Demo",
          variant: "primary",
          action: "openModal",
          show: true
        },
        {
          text: "Download Case Study",
          variant: "secondary",
          action: "download",
          show: true
        }
      ]
    },
    stats: {
      title: "Retail Excellence in Numbers",
      subtitle: "Proven results across hundreds of retail implementations",
      items: [
        {
          value: "300+",
          label: "Retail Clients",
          description: "Successful implementations",
          show: true
        },
        {
          value: "50%",
          label: "Sales Growth",
          description: "Average improvement",
          show: true
        },
        {
          value: "40%",
          label: "Cost Reduction",
          description: "In operational costs",
          show: true
        },
        {
          value: "99%",
          label: "Uptime",
          description: "System availability",
          show: true
        }
      ],
      show: true
    },
    challenges: {
      title: "Retail Challenges",
      subtitle: "Modern retail faces complex challenges that require integrated solutions to deliver exceptional customer experiences and maintain profitability.",
      items: [
        {
          title: "Omnichannel Inventory Management",
          description: "Managing inventory across multiple sales channels while maintaining real-time visibility and preventing stockouts",
          icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
          impact: "35% inventory discrepancies",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          show: true
        },
        {
          title: "Customer Experience Consistency",
          description: "Delivering consistent customer experience across online, mobile, and physical store touchpoints",
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          impact: "40% customer satisfaction issues",
          show: true
        },
        {
          title: "Seasonal Demand Planning",
          description: "Accurately forecasting demand for seasonal products and managing inventory levels accordingly",
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          impact: "25% excess seasonal inventory",
          show: true
        },
        {
          title: "Price Optimization & Promotions",
          description: "Managing dynamic pricing strategies and promotional campaigns across multiple channels",
          icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          impact: "20% margin erosion",
          show: true
        }
      ],
      show: true,
      autoRotate: true
    },
    solutions: {
      title: "NetSuite Solutions",
      subtitle: "Comprehensive retail solutions that unify your commerce operations, from inventory management to customer experience optimization.",
      items: [
        {
          title: "Omnichannel Commerce",
          description: "Unified commerce platform connecting online, mobile, and in-store experiences",
          features: [
            "Real-time inventory visibility",
            "Cross-channel order management",
            "Unified customer profiles",
            "Buy online, pick up in store",
            "Endless aisle capabilities"
          ],
          benefits: "45% improvement in inventory turnover",
          image: "https://i.pinimg.com/736x/5d/33/74/5d33743cd85ff60ff425a2614a87503f.jpg",
          show: true
        },
        {
          title: "Point of Sale (POS) Integration",
          description: "Seamlessly integrated POS system with real-time synchronization to back-office operations",
          features: [
            "Cloud-based POS system",
            "Mobile POS capabilities",
            "Real-time inventory updates",
            "Customer loyalty integration",
            "Multi-location management"
          ],
          benefits: "60% faster checkout process",
          show: true
        },
        {
          title: "E-commerce Platform",
          description: "Native e-commerce solution with advanced merchandising and personalization",
          features: [
            "Responsive web design",
            "Product catalog management",
            "Personalized recommendations",
            "Advanced search & filtering",
            "Mobile commerce optimization"
          ],
          benefits: "50% increase in online conversion",
          show: true
        },
        {
          title: "Customer Relationship Management",
          description: "360-degree customer view with advanced analytics and marketing automation",
          features: [
            "Unified customer database",
            "Purchase history tracking",
            "Loyalty program management",
            "Targeted marketing campaigns",
            "Customer service integration"
          ],
          benefits: "35% increase in customer retention",
          show: true
        }
      ],
      show: true,
      autoRotate: true
    },
    features: {
      title: "Retail Features",
      subtitle: "Comprehensive features designed specifically for retail operations and customer experience optimization.",
      items: [
        {
          title: "Inventory Management",
          description: "Real-time inventory tracking across all channels and locations",
          icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
          benefits: [
            "Real-time stock levels",
            "Automated reordering",
            "Multi-location tracking",
            "Demand forecasting"
          ],
          show: true
        },
        {
          title: "Customer Management",
          description: "Comprehensive customer profiles and loyalty program management",
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          benefits: [
            "360-degree customer view",
            "Loyalty programs",
            "Purchase history",
            "Personalized marketing"
          ],
          show: true
        },
        {
          title: "Financial Management",
          description: "Complete financial oversight with retail-specific reporting",
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          benefits: [
            "Real-time P&L",
            "Store performance",
            "Margin analysis",
            "Tax compliance"
          ],
          show: true
        },
        {
          title: "Supply Chain",
          description: "End-to-end supply chain visibility and vendor management",
          icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          benefits: [
            "Vendor management",
            "Purchase automation",
            "Drop shipping",
            "Supply chain analytics"
          ],
          show: true
        }
      ],
      show: true
    },
    caseStudies: {
      title: "Success Stories",
      subtitle: "Real retail companies achieving remarkable results with NetSuite commerce solutions.",
      items: [
        {
          company: "Fashion Forward Retail",
          industry: "Fashion & Apparel",
          challenge: "Managing inventory across 50+ stores and online channels with seasonal variations",
          solution: "NetSuite Omnichannel Commerce with advanced inventory management and demand planning",
          results: [
            "55% reduction in stockouts",
            "40% improvement in inventory turnover",
            "30% increase in cross-channel sales",
            "Real-time visibility across all channels"
          ],
          image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          show: true
        },
        {
          company: "Electronics Plus",
          industry: "Consumer Electronics",
          challenge: "Complex product configurations and warranty management across multiple channels",
          solution: "NetSuite E-commerce with product configurator and service management",
          results: [
            "70% reduction in order errors",
            "45% faster product launches",
            "60% improvement in warranty processing",
            "Automated product configuration"
          ],
          image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          show: true
        }
      ],
      show: true
    },
    implementation: {
      title: "Retail Implementation Built for All Industries",
      description: "Streamline your entire NetSuite implementation lifecycle — from discovery to go-live — with a proven, secure methodology.",
      processTitle: "Implementation Process",
      items: [
        {
          title: "Discovery & Planning",
          duration: "1-2 Weeks",
          description: "Analyze current retail operations, systems, and customer journey requirements",
          details: "Comprehensive analysis of your existing retail operations, including process mapping, system evaluation, and requirements gathering. We identify gaps and opportunities for improvement.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          benefits: [
            "Current state assessment",
            "Gap analysis",
            "Implementation roadmap",
            "Process mapping"
          ],
          show: true
        },
        {
          title: "System Design",
          duration: "2-3 Weeks",
          description: "Design NetSuite configuration for retail workflows and customer touchpoints",
          details: "Create a detailed blueprint for your NetSuite implementation, including system architecture, integration points, and customization requirements specific to retail processes.",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
          benefits: [
            "System architecture",
            "Process flows",
            "Integration design",
            "Custom requirements"
          ],
          show: true
        },
        {
          title: "Configuration & Integration",
          duration: "3-5 Weeks",
          description: "Configure NetSuite modules and integrate with POS, e-commerce, and other systems",
          details: "Implementation of NetSuite configuration based on the approved design, including custom script development, workflow automation, and integration setup.",
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          benefits: [
            "Configured system",
            "Integrations",
            "Custom developments",
            "Workflow automation"
          ],
          show: true
        },
        {
          title: "Testing & Training",
          duration: "2-3 Weeks",
          description: "Comprehensive testing and training for retail staff across all locations",
          details: "Thorough system testing including unit, integration, and user acceptance testing. Comprehensive training programs for all user groups to ensure smooth adoption.",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          benefits: [
            "Test results",
            "Training materials",
            "User documentation",
            "System validation"
          ],
          show: true
        },
        {
          title: "Go-Live & Optimization",
          duration: "1-2 Weeks",
          description: "Production deployment with ongoing support and performance optimization",
          details: "Carefully managed production deployment with real-time monitoring, immediate support, and post-implementation optimization to ensure successful system adoption.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          benefits: [
            "Live system",
            "Support documentation",
            "Performance monitoring",
            "Optimization"
          ],
          show: true
        }
      ],
      show: true
    },
    cta: {
      title: "Ready to Transform Your Retail Operations?",
      description: "Join hundreds of retail companies that have unified their commerce operations and improved customer experience with NetSuite. Get started with a free consultation today.",
      features: [
        {
          title: "Free Assessment",
          description: "Comprehensive evaluation of your retail processes",
          icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
          show: true
        },
        {
          title: "Rapid Implementation",
          description: "Get up and running faster with our proven methodology",
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          show: true
        },
        {
          title: "Ongoing Support",
          description: "Continuous optimization and support for your success",
          icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          show: true
        }
      ],
      buttonText: "Schedule Retail Demo",
      show: true
    },
    contactModal: {
      title: "Schedule Your Retail Demo",
      subtitle: "Let's discuss your retail challenges and solutions",
      show: true
    }
  }
];

export const seedIndustryDatabase = async () => {
  try {

    console.log('Connected to MongoDB');

    await Industry.deleteMany({});
    console.log('Cleared existing industries');

    const createdIndustries = await Industry.insertMany(sampleIndustries);
    console.log(`Seeded ${createdIndustries.length} industries`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
