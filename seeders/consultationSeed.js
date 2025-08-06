import mongoose from 'mongoose';
import Consultation from '../models/consultingModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleConsultations = [
  {
    name: "NetSuite Consulting Excellence",
    slug: "netsuite-consulting-excellence",
    description: "Strategic NetSuite consulting solutions for business growth and operational excellence",
    isActive: true,
    heroContent: {
      title: "NetSuite Consulting Excellence",
      subtitle: "Strategic Solutions for Business Growth",
      description: "Transform your business operations with expert NetSuite consulting services. Our certified consultants deliver strategic solutions that optimize processes, enhance efficiency, and drive measurable results.",
      backgroundImage: "https://i.pinimg.com/1200x/39/17/8a/39178a1172c9f6e650aa3e3ca34f4b74.jpg"
    },
    consultingServices: {
      title: "Our Consulting Services",
      description: "Comprehensive NetSuite consulting solutions tailored to your business needs",
      services: [
        {
          id: 1,
          title: "NetSuite Implementation Strategy",
          description: "Comprehensive planning and roadmap development for successful NetSuite deployment",
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          features: [
            { feature: "Business process analysis and optimization" },
            { feature: "System architecture design" },
            { feature: "Implementation timeline and milestones" },
            { feature: "Risk assessment and mitigation strategies" },
            { feature: "Change management planning" }
          ]
        },
        {
          id: 2,
          title: "System Optimization & Performance",
          description: "Enhance system performance and optimize NetSuite configuration for maximum efficiency",
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          features: [
            { feature: "Performance analysis and optimization" },
            { feature: "System configuration review" },
            { feature: "Workflow automation implementation" },
            { feature: "Custom field and form optimization" },
            { feature: "Integration performance tuning" }
          ]
        },
        {
          id: 3,
          title: "Custom Development & Integration",
          description: "Custom NetSuite solutions and seamless integration with existing business systems",
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
          features: [
            { feature: "SuiteScript development" },
            { feature: "Custom record and field creation" },
            { feature: "Third-party system integration" },
            { feature: "API development and management" },
            { feature: "Custom workflow automation" }
          ]
        },
        {
          id: 4,
          title: "Business Process Consulting",
          description: "Streamline and optimize your business processes with NetSuite best practices",
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          features: [
            { feature: "Process mapping and analysis" },
            { feature: "Workflow design and implementation" },
            { feature: "Best practice recommendations" },
            { feature: "Efficiency improvement strategies" },
            { feature: "Compliance and governance" }
          ]
        }
      ]
    },
    industries: {
      title: "Industry Expertise",
      description: "Specialized NetSuite consulting for your industry",
      industries: [
        {
          name: "Manufacturing",
          description: "Optimize production planning, inventory management, and supply chain operations",
          image: "/images/3.jpg",
          solutions: ["Production Planning", "Inventory Optimization", "Quality Control", "Cost Accounting"],
          link: "/industries/manufacturing"
        },
        {
          name: "Retail & E-commerce",
          description: "Streamline multi-channel operations and enhance customer experience",
          image: "/images/6.jpg",
          solutions: ["Omnichannel Management", "POS Integration", "Customer Analytics", "Inventory Management"],
          link: "/industries/retail"
        },
        {
          name: "Professional Services",
          description: "Optimize project management, resource allocation, and client billing",
          image: "/images/7.jpg",
          solutions: ["Project Management", "Resource Planning", "Time Tracking", "Client Billing"],
          link: "/industries/professional-services"
        },
        {
          name: "Distribution & Logistics",
          description: "Enhance warehouse management, order fulfillment, and logistics operations",
          image: "/images/8.jpg",
          solutions: ["Warehouse Management", "Order Fulfillment", "Route Optimization", "Inventory Control"],
          link: "/industries/distribution"
        }
      ]
    },
    consultingProcess: {
      title: "Our Consulting Process",
      description: "A proven methodology for successful NetSuite implementations and optimizations",
      process: [
        {
          step: "01",
          title: "Discovery & Assessment",
          description: "Comprehensive analysis of your current systems, processes, and business requirements",
          duration: "1-2 weeks"
        },
        {
          step: "02",
          title: "Strategy Development",
          description: "Create a detailed roadmap with timelines, milestones, and success metrics",
          duration: "1 week"
        },
        {
          step: "03",
          title: "Solution Design",
          description: "Design custom NetSuite configuration tailored to your specific needs",
          duration: "2-3 weeks"
        },
        {
          step: "04",
          title: "Implementation & Testing",
          description: "Execute the solution with thorough testing and quality assurance",
          duration: "4-8 weeks"
        },
        {
          step: "05",
          title: "Training & Go-Live",
          description: "User training, system deployment, and ongoing support",
          duration: "1-2 weeks"
        },
        {
          step: "06",
          title: "Optimization & Support",
          description: "Continuous improvement, monitoring, and ongoing consulting support",
          duration: "Ongoing"
        }
      ],
      image: "/images/consulting-process.jpg"
    },
    benefits: {
      title: "Why Choose Our Consulting",
      description: "Expert NetSuite consulting that delivers measurable business value",
      benefits: [
        {
          title: "Faster Implementation",
          description: "Reduce implementation time by up to 40% with our proven methodologies",
          metric: "40% Faster"
        },
        {
          title: "Cost Optimization",
          description: "Minimize total cost of ownership through efficient system design",
          metric: "30% Savings"
        },
        {
          title: "Risk Mitigation",
          description: "Avoid common pitfalls with our experienced consulting approach",
          metric: "95% Success Rate"
        },
        {
          title: "ROI Acceleration",
          description: "Achieve faster return on investment with optimized configurations",
          metric: "6-Month ROI"
        }
      ]
    },
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Get expert NetSuite consulting that drives results",
      description: "Schedule your free consultation today and discover how our expert consultants can optimize your NetSuite investment and transform your business operations.",
      buttonText: "Schedule Free Consultation",
      features: [
        { feature: "Free initial assessment" },
        { feature: "Custom implementation roadmap" },
        { feature: "Expert consultant team" },
        { feature: "Ongoing support and optimization" }
      ]
    }
  }
];

export const seedConsultationDatabase = async () => {
  try {
    await Consultation.deleteMany({});
    console.log('Cleared existing consultations');
    const createdConsultations = await Consultation.insertMany(sampleConsultations);
    console.log(`Seeded ${createdConsultations.length} consultations`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}