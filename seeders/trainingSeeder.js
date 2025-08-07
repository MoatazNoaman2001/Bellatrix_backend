import mongoose from 'mongoose';
import TrainingPage from '../models/trainingModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Belletrix';

const sampleTrainingPages = [
  {
    name: "Advanced Training Solutions",
    slug: "advanced-training-solutions",
    description: "Comprehensive professional development programs designed to elevate your team's skills and productivity through cutting-edge methodologies",
    isActive: true,
    heroContent: {
      title: "Advanced Training Solutions",
      description: "Comprehensive professional development programs designed to elevate your team's skills and productivity through cutting-edge methodologies.",
      backgroundVideo: "/trainingHeroSectionTwo.mp4",
      show: true
    },
    programsSection: {
      title: "Our Training Programs",
      description: "Specialized programs tailored to different skill levels and business needs, delivered by industry experts.",
      show: true
    },
    trainingPrograms: [
      {
        id: 1,
        title: "Technical Training",
        shortDescription: "Master technical skills with hands-on sessions",
        longDescription: "Our technical training program provides in-depth knowledge and practical skills in the latest technologies. Through hands-on labs and real-world scenarios, participants gain the confidence to implement solutions immediately.",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        features: [
          "Hands-on coding exercises",
          "Real-world project simulations",
          "Expert code reviews",
          "Performance optimization techniques",
          "Debugging best practices"
        ],
        show: true
      },
      {
        id: 2,
        title: "Leadership Development",
        shortDescription: "Build effective leadership and management skills",
        longDescription: "This program transforms managers into leaders by developing strategic thinking, emotional intelligence, and team-building capabilities. Participants learn through case studies and interactive role-playing.",
        icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
        features: [
          "Strategic decision making",
          "Conflict resolution techniques",
          "Team motivation strategies",
          "Effective communication methods",
          "Change management principles"
        ],
        show: true
      },
      {
        id: 3,
        title: "Business Process",
        shortDescription: "Optimize workflows and increase efficiency",
        longDescription: "Learn to analyze, redesign, and implement business processes that drive efficiency and reduce costs. This program combines lean methodologies with digital transformation strategies.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
        features: [
          "Process mapping techniques",
          "Bottleneck identification",
          "Automation strategies",
          "Continuous improvement methods",
          "Performance measurement"
        ],
        show: true
      },
      {
        id: 4,
        title: "Soft Skills",
        shortDescription: "Enhance communication and collaboration",
        longDescription: "Develop essential interpersonal skills that improve workplace relationships and productivity. This interactive program focuses on practical applications in diverse business scenarios.",
        icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
        features: [
          "Active listening techniques",
          "Presentation skills",
          "Emotional intelligence",
          "Negotiation tactics",
          "Cross-cultural communication"
        ],
        show: true
      }
    ],
    keyModulesSection: {
      title: "Key Training Modules",
      description: "Core learning components that form the foundation of our comprehensive training programs.",
      show: true
    },
    keyModules: [
      {
        title: "Fundamentals",
        description: "Build strong foundational knowledge with our core concepts module.",
        duration: "2-3 days",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        show: true
      },
      {
        title: "Advanced Techniques",
        description: "Master sophisticated methods and strategies used by industry leaders.",
        duration: "3-5 days",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        show: true
      },
      {
        title: "Case Studies",
        description: "Learn from real-world scenarios and practical applications.",
        duration: "1-2 days",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        show: true
      },
      {
        title: "Hands-on Labs",
        description: "Apply knowledge through practical exercises and simulations.",
        duration: "2-4 days",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        show: true
      },
      {
        title: "Certification Prep",
        description: "Prepare for industry-recognized certification exams.",
        duration: "3-5 days",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        show: true
      },
      {
        title: "Mentorship",
        description: "Receive guidance from experienced professionals.",
        duration: "Ongoing",
        icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
        show: true
      }
    ],
    whyChooseSection: {
      title: "Why Choose Our Training",
      description: "Our unique approach to professional development delivers measurable results and lasting impact.",
      show: true
    },
    trainingFeatures: [
      {
        id: 1,
        title: "Expert Instructors",
        shortDescription: "Learn from industry practitioners with real-world experience.",
        detailedDescription: "Our instructors are carefully selected industry experts with proven track records. They bring practical knowledge and insights that go beyond theoretical concepts, ensuring you learn applicable skills.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        benefits: [
          "Average 15+ years industry experience",
          "Certified in multiple methodologies",
          "Skilled at translating complex concepts",
          "Provide actionable feedback",
          "Maintain current industry knowledge"
        ],
        statistics: {
          experienceYears: "15+",
          certifications: "8+",
          satisfactionRate: "98%",
          repeatClients: "85%"
        },
        show: true
      },
      {
        id: 2,
        title: "Customized Content",
        shortDescription: "Training tailored to your specific business needs and goals.",
        detailedDescription: "We don't believe in one-size-fits-all training. Our programs are customized based on your industry, team composition, and business objectives to maximize relevance and impact.",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        benefits: [
          "Pre-training needs assessment",
          "Custom case studies and examples",
          "Industry-specific scenarios",
          "Flexible module selection",
          "Post-training follow-up"
        ],
        statistics: {
          customizationLevel: "100%",
          industrySpecific: "92%",
          contentRelevance: "96%",
          implementationRate: "89%"
        },
        show: true
      },
      {
        id: 3,
        title: "Practical Focus",
        shortDescription: "Immediately applicable skills with hands-on exercises.",
        detailedDescription: "Our training emphasizes practical application through workshops, simulations, and real-world exercises. Participants leave with concrete skills they can implement right away.",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        benefits: [
          "Workshops and labs",
          "Real-world simulations",
          "Immediate application",
          "Skill reinforcement",
          "Performance tracking"
        ],
        statistics: {
          handsOnTime: "70%",
          skillRetention: "87%",
          immediateUse: "94%",
          performanceGain: "45%"
        },
        show: true
      },
      {
        id: 4,
        title: "Ongoing Support",
        shortDescription: "Continued learning resources and post-training assistance.",
        detailedDescription: "Our relationship doesn't end when the training does. We provide extensive post-training resources including documentation, online materials, and consultation hours to ensure successful implementation.",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
        benefits: [
          "Post-training resources",
          "Follow-up consultations",
          "Online learning portal",
          "Community access",
          "Refresher sessions"
        ],
        statistics: {
          supportDuration: "6+ months",
          resourceAccess: "24/7",
          followUpSessions: "3+",
          satisfactionRetention: "91%"
        },
        show: true
      }
    ],
    images: {
      trainingHero: "/trainingHeroSectionTwo.mp4",
      trainingPrograms: "/images/traning.jpg",
      whyChoose: "/images/chooese.png"
    },
    stats: {
      title: "Training Success Metrics",
      subtitle: "Proven results across thousands of training sessions",
      items: [
        {
          value: "5000+",
          label: "Professionals Trained",
          description: "Successful completions",
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          show: true
        },
        {
          value: "98%",
          label: "Satisfaction Rate",
          description: "Client approval rating",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          show: true
        },
        {
          value: "87%",
          label: "Skill Retention",
          description: "Long-term application",
          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
          show: true
        },
        {
          value: "45%",
          label: "Performance Gain",
          description: "Average improvement",
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          show: true
        }
      ],
      show: true
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Real feedback from training participants and their managers",
      items: [
        {
          name: "Sarah Johnson",
          position: "Development Manager",
          company: "TechCorp Inc.",
          testimonial: "The technical training program exceeded our expectations. Our team's productivity increased by 40% within three months.",
          rating: 5,
          avatar: "/images/testimonials/sarah.jpg",
          show: true
        },
        {
          name: "Michael Chen",
          position: "Project Director",
          company: "Innovation Labs",
          testimonial: "Outstanding leadership development program. The practical approach and real-world scenarios made all the difference.",
          rating: 5,
          avatar: "/images/testimonials/michael.jpg",
          show: true
        },
        {
          name: "Emily Rodriguez",
          position: "Operations Manager",
          company: "Global Dynamics",
          testimonial: "The business process training transformed how we work. We've eliminated inefficiencies and improved our workflow significantly.",
          rating: 5,
          avatar: "/images/testimonials/emily.jpg",
          show: true
        }
      ],
      show: true
    },
    cta: {
      title: "Ready to Transform Your Team?",
      subtitle: "Start your training journey today",
      description: "Join thousands of professionals who have advanced their careers through our comprehensive training programs.",
      buttonText: "Schedule Training Consultation",
      buttonAction: "openModal",
      features: [
        "Free training needs assessment",
        "Customized program design",
        "Expert instructor matching",
        "Flexible scheduling options"
      ],
      show: true
    },
    contactModal: {
      title: "Training Consultation Request",
      subtitle: "Let's discuss your team's training needs",
      description: "Our training experts will work with you to design the perfect program for your team's development goals.",
      show: true
    }
  }
];

export const seedTrainingPageDatabase = async () => {
  try {
    await TrainingPage.deleteMany({});
    console.log('Cleared existing training pages');

    const createdTrainingPages = await TrainingPage.insertMany(sampleTrainingPages);
    console.log(`Seeded ${createdTrainingPages.length} training pages`);

  } catch (error) {
    console.error('Error seeding training page database:', error);
    process.exit(1);
  }
};
