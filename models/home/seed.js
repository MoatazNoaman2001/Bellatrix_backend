import mongoose from 'mongoose';
import Hero from './heroModel.js';
import Service from './serviceModel.js';
import Testimonial from './testimonialModel.js';
import Industry from './industryModel.js';
import Training from './trainingModel.js';

const homeData = {
  "hero": {
    "slides": [
      {
        "title": "Strategic Business Transformation",
        "subtitle": "Oracle NetSuite Consultancy",
        "description": "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
        "video": "/Videos/HomeHeroSectionV.mp4",
        "cta": "Explore Services"
      },
      {
        "title": "Digital Optimization Experts",
        "subtitle": "Cloud Solutions Specialists",
        "description": "Enhance productivity with our tailored implementation and consulting services.",
        "video": "/video2.mp4",
        "cta": "View Case Studies"
      },
      {
        "title": "Data-Driven Decision Making",
        "subtitle": "Business Intelligence Partners",
        "description": "Leverage real-time analytics to transform your operations.",
        "video": "/video3.mp4",
        "cta": "Request Consultation"
      }
    ],
    "stats": [
      { "value": "200+", "label": "Projects" },
      { "value": "98%", "label": "Satisfaction" },
      { "value": "15+", "label": "Years" }
    ]
  },
  "services": {
    "services": [
      {
        "title": "Strategic Consultation",
        "description": "Expert analysis to optimize your NetSuite roadmap with actionable insights",
        "icon": "LightbulbOutlined",
        "color": "#10B981",
        "details": [
          "Business process analysis",
          "ROI forecasting",
          "System architecture planning",
          "Change management strategy"
        ],
        "stats": "92% client satisfaction rate"
      },
      {
        "title": "Flawless Implementation",
        "description": "End-to-end deployment with minimal disruption to operations",
        "icon": "BuildOutlined",
        "color": "#0EA5E9",
        "details": [
          "Phased rollout planning",
          "Data migration services",
          "Configuration best practices",
          "Go-live support"
        ],
        "stats": "40% faster than industry average"
      },
      {
        "title": "Adaptive Training",
        "description": "Customized learning paths for all user levels and roles",
        "icon": "SchoolOutlined",
        "color": "#8B5CF6",
        "details": [
          "Role-based training programs",
          "Interactive e-learning modules",
          "Custom documentation",
          "Ongoing certification"
        ],
        "stats": "85% faster user adoption"
      },
      {
        "title": "Tailored Customization",
        "description": "Bespoke solutions addressing your unique business needs",
        "icon": "SettingsOutlined",
        "color": "#EC4899",
        "details": [
          "Workflow automation",
          "Custom dashboards",
          "Advanced reporting",
          "Third-party integrations"
        ],
        "stats": "300+ custom solutions delivered"
      },
      {
        "title": "Seamless Integration",
        "description": "Unified ecosystem connecting NetSuite with your tech stack",
        "icon": "LinkOutlined",
        "color": "#F59E0B",
        "details": [
          "API development",
          "Middleware configuration",
          "Data synchronization",
          "Real-time analytics"
        ],
        "stats": "99.9% integration uptime"
      }
    ],
    "sectionHeader": {
      "title": "Our Professional Services",
      "subtitle": "Comprehensive solutions tailored to your business needs",
      "gradientText": "Professional Services"
    },
    "viewAllButton": {
      "text": "View All Services"
    }
  },
  "testimonials": {
    "testimonials": [
      {
        "id": 1,
        "quote": "Bellatrix transformed our operations. Their NetSuite expertise is unmatched.",
        "name": "John Doe",
        "title": "CEO of TechCorp",
        "avatar": "JD",
        "rating": 5,
        "results": ["40% efficiency boost", "Seamless migration", "24/7 support"]
      },
      {
        "id": 2,
        "quote": "The implementation was flawless. Their team delivered beyond expectations.",
        "name": "Jane Smith",
        "title": "COO of Innovate Inc.",
        "avatar": "JS",
        "rating": 5,
        "results": ["50% faster deployment", "Zero downtime", "Custom integrations"]
      },
      {
        "id": 3,
        "quote": "Our productivity skyrocketed by 40% after switching to Bellatrix.",
        "name": "Sam Wilson",
        "title": "CFO of Global Solutions",
        "avatar": "SW",
        "rating": 5,
        "results": ["Real-time analytics", "Cost savings", "Scalable infrastructure"]
      },
      {
        "id": 4,
        "quote": "Exceptional technical skills with deep business understanding.",
        "name": "Sarah Johnson",
        "title": "Director of Operations",
        "avatar": "SJ",
        "rating": 4,
        "results": ["Automated workflows", "User-friendly UI", "Training included"]
      },
      {
        "id": 5,
        "quote": "The best investment in our digital transformation journey.",
        "name": "Michael Brown",
        "title": "IT Manager",
        "avatar": "MB",
        "rating": 5,
        "results": ["Cloud optimization", "Security upgrades", "API integrations"]
      }
    ],
    "sectionHeader": {
      "title": "Trusted by Industry Leaders",
      "subtitle": "Don't just take our word for it—here's what our clients say.",
      "gradientText": "Trusted by Industry Leaders"
    },
    "ctaButton": {
      "text": "Contact This Client's Success Manager"
    }
  },
  "industries": {
    "industries": [
      {
        "id": "manufacturing",
        "label": "Manufacturing",
        "icon": "Factory",
        "content": {
          "title": "Manufacturing Solutions",
          "description": "Streamline your manufacturing operations with our comprehensive NetSuite solutions. From production planning to inventory management, we help you optimize every aspect of your manufacturing process.",
          "features": [
            "Production planning and scheduling",
            "Inventory and supply chain management",
            "Quality control and compliance",
            "Cost accounting and analysis",
            "Shop floor control"
          ],
          "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      },
      {
        "id": "retail",
        "label": "Retail",
        "icon": "Store",
        "content": {
          "title": "Retail Solutions",
          "description": "Transform your retail operations with our integrated NetSuite solutions. Manage inventory, sales, and customer relationships across multiple channels seamlessly.",
          "features": [
            "Multi-channel retail management",
            "Inventory optimization",
            "Customer relationship management",
            "Point of sale integration",
            "E-commerce integration"
          ],
          "image": "https://images.unsplash.com/photo-1441986300917-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      },
      {
        "id": "professional-services",
        "label": "Professional Services",
        "icon": "Briefcase",
        "content": {
          "title": "Professional Services Solutions",
          "description": "Optimize your service delivery with our NetSuite solutions for professional services firms. From project management to resource allocation, we help you deliver exceptional service.",
          "features": [
            "Project management and tracking",
            "Resource allocation and planning",
            "Time and expense management",
            "Client billing and invoicing",
            "Service delivery automation"
          ],
          "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      },
      {
        "id": "wholesale-distribution",
        "label": "Wholesale Distribution",
        "icon": "Package",
        "content": {
          "title": "Wholesale Distribution Solutions",
          "description": "Optimize your wholesale distribution operations with our NetSuite solutions. From order management to inventory control, we help you streamline your distribution processes.",
          "features": [
            "Order management and fulfillment",
            "Inventory and warehouse management",
            "Supplier relationship management",
            "Pricing and discount management",
            "Multi-channel distribution"
          ],
          "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      }
    ],
    "sectionHeader": {
      "chipLabel": "INDUSTRY SOLUTIONS",
      "title": "Discover Modern Industry Solutions",
      "highlightedWord": "Modern",
      "description": "Explore how our blue-powered platform transforms your sector with interactive, tailored solutions."
    },
    "styles": {
      "blueGradient": "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
      "glassBg": "rgba(255,255,255,0.7)"
    }
  }
};

const trainingData = {
  trainingPrograms: [
    {
      id: 1,
      title: 'NetSuite Fundamentals',
      shortDescription: 'Core concepts and navigation basics',
      longDescription: "This comprehensive fundamentals program introduces you to the core concepts of NetSuite, covering essential navigation, basic configuration, and understanding the platform's architecture. Perfect for new users who want to build a solid foundation in NetSuite operations. You'll learn about dashboards, basic record management, user interface customization, and essential business processes. Our expert instructors will guide you through hands-on exercises to ensure practical understanding of the system.",
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      id: 2,
      title: 'Advanced Modules',
      shortDescription: 'Financial management and reporting',
      longDescription: "Dive deep into NetSuite's advanced modules with focus on financial management, advanced reporting, and complex business processes. This program covers general ledger management, accounts payable and receivable, budgeting and forecasting, financial reporting, and period-end procedures. You'll master advanced workflows, approval processes, and learn to create sophisticated financial reports. Ideal for finance professionals and power users who need to leverage NetSuite's full financial capabilities.",
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      id: 3,
      title: 'Customization Training',
      shortDescription: 'SuiteScript and custom solutions',
      longDescription: "Master NetSuite customization through comprehensive SuiteScript training and custom solution development. This advanced program covers SuiteScript 2.0, custom fields, forms, records, workflows, and restlets. You'll learn to build custom applications, integrate with external systems, and create sophisticated automation solutions. The course includes practical projects where you'll develop real-world customizations, user event scripts, scheduled scripts, and client scripts. Perfect for developers and technical consultants.",
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 4,
      title: 'Admin & Security',
      shortDescription: 'System administration and security',
      longDescription: "Comprehensive system administration and security training for NetSuite environments. Learn user management, role configuration, permission settings, data security, and system maintenance. This program covers advanced topics including single sign-on (SSO), two-factor authentication, IP restrictions, audit trails, and compliance requirements. You'll master user provisioning, role-based access control, and security best practices. Essential for system administrators and IT professionals responsible for NetSuite security and governance.",
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    }
  ],
  trainingFeatures: [
    {
      id: 1,
      title: 'Expert Instructors',
      shortDescription: 'Certified professionals with years of experience',
      detailedDescription: "Our instructors are certified NetSuite professionals with extensive real-world experience across various industries. They bring practical insights from hundreds of implementations and possess deep technical knowledge of NetSuite's capabilities. Each instructor holds multiple NetSuite certifications and maintains up-to-date expertise through continuous learning and hands-on project experience.",
      benefits: [
        'Industry-proven expertise with 10+ years of NetSuite experience',
        'Multiple NetSuite certifications (Administrator, Developer, Consultant)',
        'Real-world implementation experience across 500+ projects',
        'Specialized knowledge in various industry verticals',
        'Continuous learning and certification maintenance',
        'Direct access to NetSuite development team insights'
      ],
      statistics: {
        experience: '10+ Years Average',
        certifications: '5+ Per Instructor',
        projectsCompleted: '500+ Projects',
        studentsSatisfaction: '98% Rating'
      },
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      id: 2,
      title: 'Hands-on Learning',
      shortDescription: 'Practical exercises with real-world scenarios',
      detailedDescription: "Our training methodology emphasizes practical, hands-on learning through real-world scenarios and interactive exercises. Students work with live NetSuite environments, complete actual business processes, and solve real implementation challenges. This approach ensures immediate application of knowledge and builds confidence in using NetSuite effectively.",
      benefits: [
        'Live NetSuite sandbox environments for each student',
        'Real business scenarios from actual client implementations',
        'Step-by-step guided exercises with immediate feedback',
        'Group projects that simulate workplace collaboration',
        'Access to sample data from various industries',
        'Practice with actual business workflows and processes'
      ],
      statistics: {
        practicalTime: '70% Hands-on',
        scenarios: '50+ Real Cases',
        environments: 'Individual Sandboxes',
        completionRate: '95% Success'
      },
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      id: 3,
      title: 'Flexible Scheduling',
      shortDescription: 'Multiple training formats to fit your needs',
      detailedDescription: "We understand that every organization has unique scheduling requirements. Our flexible training options include multiple formats, timing options, and customization levels to accommodate your team's availability and learning preferences. Whether you need intensive workshops or extended learning programs, we have options that work for you.",
      benefits: [
        'In-person, virtual, and hybrid training formats',
        'Weekend and evening session availability',
        'Self-paced online modules with instructor support',
        'Custom scheduling for corporate groups',
        'Recorded sessions for future reference',
        'Flexible start dates throughout the year'
      ],
      statistics: {
        formats: '3 Training Modes',
        flexibility: '24/7 Online Access',
        customization: '100% Adaptable',
        availability: 'Year-round'
      },
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 4,
      title: 'Ongoing Support',
      shortDescription: 'Continuous assistance beyond training completion',
      detailedDescription: "Our commitment to your success extends far beyond the classroom. We provide comprehensive ongoing support to ensure you can apply your new skills effectively in your work environment. This includes technical assistance, best practice guidance, and access to our expert community for continued learning and problem-solving.",
      benefits: [
        '6 months of post-training email and phone support',
        'Access to exclusive online community and forums',
        'Monthly Q&A sessions with expert instructors',
        'Updated training materials as NetSuite evolves',
        'Priority access to advanced courses and webinars',
        'Direct line to implementation consultants for complex issues'
      ],
      statistics: {
        supportDuration: '6+ Months',
        responseTime: '24 Hours',
        community: '1000+ Members',
        satisfaction: '97% Positive'
      },
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z'
    }
  ],
  keyModules: [
    {
      title: 'System Architecture',
      description: 'Core system structure, data flow, and integration patterns',
      duration: '8 hours',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    {
      title: 'Financial Management',
      description: 'General ledger, budgeting, financial reporting, and analytics',
      duration: '12 hours',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'E-commerce & CRM',
      description: 'Customer relationship management and e-commerce integration',
      duration: '10 hours',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
    },
    {
      title: 'Customization & Scripts',
      description: 'SuiteScript, custom fields, forms, and workflow automation',
      duration: '16 hours',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      title: 'Advanced Reporting',
      description: 'Saved searches, dashboard creation, and analytics tools',
      duration: '8 hours',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      title: 'User Administration',
      description: 'Role-based permissions, security setup, and user management',
      duration: '6 hours',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    }
  ],
  heroContent: {
    title: 'Professional Training Programs',
    description: 'Empower your team with comprehensive training solutions designed to enhance skills and drive success'
  },
  programsSection: {
    title: 'Our Training Programs',
    description: 'Comprehensive training solutions designed to empower your team with the skills they need to excel'
  },
  keyModulesSection: {
    title: 'Key Training Modules',
    description: 'Comprehensive curriculum designed to master NetSuite from foundation to advanced implementation'
  },
  whyChooseSection: {
    title: 'Why Choose Our Training?',
    description: "We provide world-class training solutions that combine expertise, innovation, and practical application to ensure your team's success"
  }
};

export default async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/Belletrix');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hero.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await Industry.deleteMany({});
    await Training.deleteMany({});
    console.log('Existing data cleared');

    // Seed Hero data
    await Hero.create(homeData.hero);
    console.log('Hero data seeded');

    // Seed Services data
    await Service.create(homeData.services);
    console.log('Services data seeded');

    // Seed Testimonials data
    await Testimonial.create(homeData.testimonials);
    console.log("Testimonials data seeded");

    // Seed Industries data
    await Industry.create(homeData.industries);
    console.log('Industries data seeded');

    await Training.create(trainingData);
    console.log('Training data seeded');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}
