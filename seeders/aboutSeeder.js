import mongoose from 'mongoose';
import {About } from '../models/aboutModel.js';


const aboutData = {
  "hero": {
    "title": "About Bellatrix",
    "subtitle": "Empowering businesses worldwide with innovative Oracle NetSuite solutions, expert consulting, and transformative digital experiences that drive sustainable growth.",
    "buttonText": "Discover Our Story",
    "backgroundVideo": "/public/Videos/about-hero.mp4"
  },
  "mission": {
    "title": "About Bellatrix",
    "subtitle": "We are a leading Oracle NetSuite consultancy dedicated to transforming businesses through innovative technology solutions and strategic digital transformation initiatives.",
    "missionTitle": "Our Mission",
    "missionDescription": "To empower businesses worldwide with cutting-edge Oracle NetSuite solutions that drive operational excellence, enhance productivity, and accelerate growth. We believe in creating lasting partnerships that deliver measurable value and sustainable success.",
    "stats": [
      { "value": "500+", "label": "Projects Completed" },
      { "value": "98%", "label": "Client Satisfaction" },
      { "value": "15+", "label": "Years Experience" },
      { "value": "50+", "label": "Expert Team" }
    ],
    "image": "/images/ourProServices.png"
  },
  "journey": {
    "title": "Our Journey",
    "subtitle": "From humble beginnings to becoming a trusted Oracle NetSuite partner, our journey has been marked by innovation, growth, and unwavering commitment to excellence.",
    "beginning": {
      "title": "The Beginning",
      "description": "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments."
    },
    "growth": {
      "title": "Growth & Evolution",
      "description": "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential."
    },
    "today": {
      "title": "Today",
      "description": "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity."
    },
    "image": "/images/solution.jpg"
  },
  "team": {
    "title": "Meet Our Team",
    "subtitle": "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
    "members": [
      {
        "name": "Sarah Johnson",
        "role": "Chief Executive Officer",
        "image": "/public/images/ourteam/1.jpg",
        "bio": "Visionary leader with 20+ years in enterprise software solutions.",
        "expertise": ["Strategic Planning", "Business Development", "Leadership"]
      },
      {
        "name": "Michael Chen",
        "role": "Chief Technology Officer",
        "image": "/public/images/ourteam/2.jpg",
        "bio": "Technology expert specializing in NetSuite implementations and cloud solutions.",
        "expertise": ["NetSuite Development", "Cloud Architecture", "System Integration"]
      },
      {
        "name": "Emily Rodriguez",
        "role": "Head of Operations",
        "image": "/public/images/ourteam/3.jpg",
        "bio": "Operations specialist ensuring seamless project delivery and client success.",
        "expertise": ["Project Management", "Process Optimization", "Quality Assurance"]
      },
      {
        "name": "David Kim",
        "role": "Lead Consultant",
        "image": "/public/images/ourteam/1.jpg",
        "bio": "Senior consultant with expertise in business process optimization.",
        "expertise": ["Business Analysis", "Process Design", "Training"]
      },
      {
        "name": "Lisa Thompson",
        "role": "Senior Developer",
        "image": "/public/images/ourteam/2.jpg",
        "bio": "Full-stack developer with deep expertise in NetSuite customization.",
        "expertise": ["NetSuite SuiteScript", "JavaScript", "API Integration"]
      },
      {
        "name": "Alex Martinez",
        "role": "Business Analyst",
        "image": "/public/images/ourteam/3.jpg",
        "bio": "Experienced analyst specializing in business process mapping and optimization.",
        "expertise": ["Requirements Gathering", "Process Mapping", "User Training"]
      }
    ]
  },
  "values": {
    "title": "Our Values",
    "subtitle": "These core values guide everything we do and shape how we interact with our clients, partners, and each other.",
    "items": [
      {
        "title": "Innovation",
        "description": "We embrace cutting-edge technologies and creative thinking to solve complex business challenges.",
        "color": "from-blue-500 to-cyan-500"
      },
      {
        "title": "Excellence",
        "description": "We deliver exceptional quality in every project, exceeding client expectations consistently.",
        "color": "from-purple-500 to-pink-500"
      },
      {
        "title": "Integrity",
        "description": "We act with honesty and transparency, building trust through ethical business practices.",
        "color": "from-green-500 to-teal-500"
      },
      {
        "title": "Partnership",
        "description": "We work closely with our clients as trusted partners in their digital transformation journey.",
        "color": "from-orange-500 to-red-500"
      }
    ]
  },
  "differentiators": {
    "title": "What Sets Us Apart",
    "subtitle": "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
    "items": [
      {
        "title": "Industry Expertise",
        "description": "Deep understanding of various industries and their unique challenges.",
        "stats": "15+ Industries"
      },
      {
        "title": "Proven Methodology",
        "description": "Time-tested implementation methodology ensuring project success.",
        "stats": "98% Success Rate"
      },
      {
        "title": "Ongoing Support",
        "description": "24/7 support and maintenance services for continuous optimization.",
        "stats": "24/7 Support"
      },
      {
        "title": "Custom Solutions",
        "description": "Tailored solutions designed specifically for your business needs.",
        "stats": "100% Custom"
      }
    ]
  },
  "milestones": {
    "title": "Our Milestones",
    "subtitle": "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
    "items": [
      {
        "year": "2008",
        "title": "Company Founded",
        "description": "Bellatrix was established with a vision to transform businesses through technology."
      },
      {
        "year": "2012",
        "title": "First 100 Clients",
        "description": "Reached our first major milestone of serving 100 satisfied clients."
      },
      {
        "year": "2016",
        "title": "NetSuite Gold Partner",
        "description": "Achieved NetSuite Gold Partner status, recognizing our expertise."
      },
      {
        "year": "2020",
        "title": "Global Expansion",
        "description": "Expanded operations to serve clients across multiple continents."
      },
      {
        "year": "2023",
        "title": "500+ Projects",
        "description": "Successfully completed over 500 implementation projects."
      },
      {
        "year": "2024",
        "title": "AI Integration",
        "description": "Pioneered AI-powered solutions for enhanced business intelligence."
      }
    ]
  },
  "cta": {
    "title": "Ready to Build Something Great?",
    "subtitle": "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
    "buttonText": "Start Consultation",
    "features": [
      {
        "title": "Quick Start",
        "description": "Get started our consultation"
      },
      {
        "title": "Tailored Solutions",
        "description": "Custom solutions for your business"
      },
      {
        "title": "Proven Results",
        "description": "98% client satisfaction rate"
      }
    ]
  }
};

export default async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/Belletrix');
    console.log('Connected to MongoDB');

    // Clear existing data
    await About.deleteMany({});
    console.log('Existing data cleared');


    // Seed About data
    await About.create(aboutData);
    console.log('About data seeded');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}