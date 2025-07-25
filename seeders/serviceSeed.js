import mongoose from 'mongoose';
import Service from '../models/ServiceSection.js';
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
    },
    benefits: {
      title: "Why Choose Our Accounting Solution?",
      subtitle: "Streamline your financial operations with these key benefits.",
      items: [
        {
          title: "Automated Bookkeeping",
          description: "Simplify your bookkeeping with automated transaction tracking.",
          icon: "bookkeeping",
          features: ["Transaction tracking", "Real-time reporting"]
        },
        {
          title: "Tax Compliance",
          description: "Stay compliant with automated tax calculations and reporting.",
          icon: "tax",
          features: ["Tax automation", "Compliance reports"]
        }
      ],
      demo: {
        images: [
          "https://example.com/images/accounting-dashboard-1.png",
          "https://example.com/images/accounting-dashboard-2.png"
        ]
      },
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "light",
        animation: "fade-in"
      }
    }
  },
  {
    name: "Payroll System",
    slug: "payroll-system",
    description: "Intelligent, automated payroll system for businesses",
    isActive: true,
    hero: {
      title: "Transform Your Payroll Process",
      subtitle: "Streamline operations with our intelligent, automated payroll system",
      media: {
        type: "image",
        url: "/images/payrollFinal.jpeg",
        fallback: "#1e40af",
        alt: "Payroll Dashboard Interface"
      },
      cta: {
        primary: {
          text: "See Live Demo",
          url: "#demo",
          variant: "primary"
        },
        secondary: {
          text: "Talk to Expert",
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
      title: "Why Choose Our Payroll System?",
      subtitle: "Experience the advantages of a modern payroll solution designed for efficiency and compliance.",
      items: [
        {
          title: "Time-Saving Automation",
          description: "Automate repetitive payroll tasks to save time and reduce errors.",
          icon: "automation",
          features: ["Scheduled payroll runs", "Error-free calculations"]
        },
        {
          title: "Global Compliance",
          description: "Stay compliant with local and international payroll regulations.",
          icon: "compliance",
          features: ["Tax law updates", "Multi-country support"]
        },
        {
          title: "Employee Empowerment",
          description: "Enable employees to access payslips and tax documents anytime.",
          icon: "self-service",
          features: ["Self-service portal", "Mobile access"]
        }
      ],
      demo: {
        images: [
          "/images/payroll-demo-1.png",
          "/images/payroll-demo-2.png"
        ]
      },
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "light",
        animation: "fade-in"
      }
    },
    painPoints: {
      title: "The Payroll Struggles We Eliminate",
      subtitle: "Our system addresses the most common payroll challenges faced by consultancy firms:",
      items: [
        {
          title: "Delayed salary processing and errors",
          description: "",
          icon: "clock-error",
          features: []
        },
        {
          title: "Manual tax calculations and compliance risks",
          description: "",
          icon: "tax-error",
          features: []
        },
        {
          title: "Lack of visibility and transparency for employees",
          description: "",
          icon: "visibility",
          features: []
        },
        {
          title: "Difficulty scaling payroll operations across geographies",
          description: "",
          icon: "scale",
          features: []
        },
        {
          title: "Disconnected systems leading to data silos",
          description: "",
          icon: "disconnect",
          features: []
        }
      ],
      illustration: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        alt: "Payroll illustration showing digital payroll process"
      },
      settings: {
        show: true,
        layout: "split",
        theme: "light",
        animation: "fade-in"
      }
    },
    modules: {
      title: "Payroll System Modules",
      subtitle: "Flexible components to tailor your payroll process to your business needs.",
      items: [
        {
          title: "Payroll Processing",
          description: "Automate salary calculations, deductions, and disbursements.",
          icon: "payroll",
          features: ["Auto calculations", "Direct deposit"]
        },
        {
          title: "Tax Management",
          description: "Handle tax calculations and filings with built-in compliance.",
          icon: "tax",
          features: ["Tax updates", "Compliance reports"]
        },
        {
          title: "Employee Portal",
          description: "Provide employees with secure access to payroll information.",
          icon: "portal",
          features: ["Payslip access", "Tax document download"]
        }
      ],
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "dark",
        animation: "fade-in"
      }
    },
    useCases: {
      title: "Why It's Perfect for Your Business",
      subtitle: "",
      items: [
        {
          title: "Handles flexible work models (remote, hybrid, contract)",
          description: "",
          icon: ""
        },
        {
          title: "Built-in compliance for local and global operations",
          description: "",
          icon: ""
        },
        {
          title: "Reduces time spent on admin work by 70%",
          description: "",
          icon: ""
        },
        {
          title: "Supports dynamic teams with frequent changes",
          description: "",
          icon: ""
        },
        {
          title: "Scales with your business — from startup to enterprise",
          description: "",
          icon: ""
        }
      ],
      illustration: {
        url: "/images/p.jpg",
        alt: "Payroll Dashboard Interface"
      },
      settings: {
        show: true,
        layout: "split",
        theme: "light",
        animation: "fade-in"
      }
    },
    howItWorks: {
      title: "How Our Payroll System Works",
      description: "Our payroll process is simple: upload employee and contract details, sync timesheets and leave data, let the system run payroll automatically on schedule, approve via role-based access, execute payments through integrated bank APIs, and download payslips & compliance-ready reports—all in one platform.",
      steps: [],
      settings: {
        show: true,
        theme: "dark",
        animation: "glow",
        layout: "stepper"
      }
    },
    workflow: {
      title: "Payroll System Built for All Industries",
      subtitle: "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
      stepTitle: "Core Workflow",
      items: [
        {
          title: "Employee data import",
          description: "Easily onboard and manage employee records in one place.",
          details: "Import employee data from spreadsheets or integrated HR systems. Supports bulk uploads and data validation with real-time error checking.",
          icon: "upload",
          features: ["Bulk import from Excel/CSV", "Data validation", "Duplicate detection", "HR system integration"]
        },
        {
          title: "Time & attendance sync",
          description: "Integrate timesheets and attendance for accurate payroll.",
          details: "Syncs with your time tracking tools to ensure accurate hours and leave data for every employee. Supports multiple time tracking systems.",
          icon: "time",
          features: ["Real-time sync", "Multiple time systems", "Leave management", "Overtime calculation"]
        },
        {
          title: "Salary & tax auto-calculation",
          description: "Automate salary, tax, and deduction calculations.",
          details: "Calculates gross and net pay, taxes, and deductions automatically based on your rules and local compliance. Handles complex tax scenarios.",
          icon: "calculator",
          features: ["Auto tax calculation", "Compliance built-in", "Deduction management", "Bonus processing"]
        },
        {
          title: "Approval workflows",
          description: "Streamline approvals with role-based access.",
          details: "Multi-level approval flows for payroll runs, with notifications and audit trails. Customizable approval hierarchies.",
          icon: "approval",
          features: ["Multi-level approval", "Email notifications", "Audit trails", "Role-based access"]
        },
        {
          title: "Payment execution",
          description: "Execute payments securely through integrated bank APIs.",
          details: "Initiate salary payments directly from the platform with secure, bank-level integrations. Supports multiple payment methods.",
          icon: "payment",
          features: ["Bank API integration", "Multiple payment methods", "Secure transactions", "Payment tracking"]
        },
        {
          title: "Payslip generation & reporting",
          description: "Generate payslips and compliance-ready reports instantly.",
          details: "Employees get digital payslips; admins get downloadable, compliance-ready reports. Customizable templates and automated distribution.",
          icon: "report",
          features: ["Digital payslips", "Custom templates", "Auto distribution", "Compliance reports"]
        }
      ],
      settings: {
        show: true,
        layout: "stepper",
        theme: "light",
        animation: "slide"
      }
    },
    features: {
      title: "Key Payroll Features",
      subtitle: "Everything you need for seamless payroll processing",
      items: [
        {
          title: "Automated Payroll Runs",
          description: "Set up payroll once and let it run automatically, with full audit trails.",
          icon: "automation",
          features: []
        },
        {
          title: "Tax & Compliance",
          description: "Stay compliant with local tax laws and generate reports in one click.",
          icon: "tax",
          features: []
        },
        {
          title: "Employee Self-Service",
          description: "Employees access payslips, tax docs, and leave balances anytime.",
          icon: "self-service",
          features: []
        },
        {
          title: "Real-Time Analytics",
          description: "Get instant insights into payroll costs, trends, and forecasts.",
          icon: "analytics",
          features: []
        },
        {
          title: "Multi-Country Support",
          description: "Run payroll for teams in multiple countries, currencies, and languages.",
          icon: "global",
          features: []
        },
        {
          title: "Integrations",
          description: "Connect with HR, time tracking, and accounting tools you already use.",
          icon: "integration",
          features: []
        }
      ],
      settings: {
        show: true,
        layout: "grid-cols-3",
        theme: "dark",
        animation: "none"
      }
    },
    pricing: {
      title: "",
      subtitle: "",
      plans: [],
      settings: {
        show: false,
        disclaimer: "",
        layout: "grid-cols-3",
        theme: "dark",
        animation: "none"
      }
    },
    faq: {
      title: "Common Questions",
      subtitle: "Get quick answers to the most frequently asked questions about our payroll system",
      items: [
        {
          question: "Does this system support global payroll?",
          answer: "Yes, we support multi-country and multi-currency payroll operations."
        },
        {
          question: "Can it integrate with our existing HR system?",
          answer: "Absolutely, we offer seamless integrations and open APIs."
        },
        {
          question: "How long does implementation take?",
          answer: "Most companies are onboarded in less than 2 weeks."
        },
        {
          question: "Is the platform secure?",
          answer: "Yes, we use bank-level encryption and comply with global security standards to protect your sensitive payroll data."
        },
        {
          question: "Can employees access their payroll information?",
          answer: "Yes, through our employee self-service portal, staff can securely access their payslips, tax documents, and payment history."
        }
      ],
      settings: {
        show: true,
        expandMultiple: true,
        layout: "list",
        theme: "light",
        animation: "fade-in"
      }
    },
    cta: {
      title: "Ready to Simplify Your Payroll?",
      subtitle: "Get in touch for a personalized demo and see how our solution can transform your payroll process.",
      buttons: [
        {
          text: "Request Now!",
          url: "#contact",
          variant: "primary"
        }
      ],
      settings: {
        show: true,
        theme: "light",
        layout: "center",
        animation: "fade-in"
      }
    },
    demo: {
      images: [
        "/images/Hr/hrS1.png",
        "/images/Hr/hrS2.jpeg"
      ],
      settings: {
        show: true
      }
    }
  }
];

export const seedServiceDatabase = async () => {
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
