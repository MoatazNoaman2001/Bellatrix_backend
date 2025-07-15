import mongoose from 'mongoose';
import Integration from '../models/integrationModel.js';

const integrationData = {
  "heroContent": {
    "title": "NetSuite Integration Solutions",
    "subtitle": "Seamlessly Connect Your Business Systems",
    "description": "Transform your business operations with powerful NetSuite integrations. Connect your existing systems, automate workflows, and create a unified data ecosystem that drives efficiency and growth.",
    "backgroundImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  "integrationTypes": {
    "title": "Integration Types",
    "description": "Comprehensive integration solutions for every business need",
    "types": [
      {
        "id": 1,
        "title": "API Integrations",
        "description": "Connect NetSuite with external systems through robust API development",
        "icon": "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        "features": [
          "RESTful API development",
          "Real-time data synchronization",
          "Custom endpoint creation",
          "Authentication & security",
          "Error handling & logging"
        ],
        "image": "/images/api-integration.jpg"
      },
      {
        "id": 2,
        "title": "E-commerce Integrations",
        "description": "Connect your online stores with NetSuite for seamless order management",
        "icon": "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
        "features": [
          "Shopify integration",
          "WooCommerce connection",
          "Order synchronization",
          "Inventory management",
          "Customer data sync"
        ],
        "image": "/images/ecommerce-integration.jpg"
      },
      {
        "id": 3,
        "title": "CRM Integrations",
        "description": "Unify customer data across your CRM and NetSuite systems",
        "icon": "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        "features": [
          "Salesforce integration",
          "HubSpot connection",
          "Lead synchronization",
          "Opportunity tracking",
          "Contact management"
        ],
        "image": "/images/crm-integration.jpg"
      },
      {
        "id": 4,
        "title": "Payment Gateway Integrations",
        "description": "Streamline payment processing with secure gateway connections",
        "icon": "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
        "features": [
          "Stripe integration",
          "PayPal connection",
          "Square integration",
          "Payment reconciliation",
          "Fraud protection"
        ],
        "image": "/images/payment-integration.jpg"
      }
    ]
  },
  "integrationBenefits": {
    "title": "Integration Benefits",
    "description": "Transform your business with powerful integration solutions",
    "benefits": [
      {
        "title": "Automated Workflows",
        "description": "Eliminate manual data entry and reduce errors with automated processes",
        "icon": "M13 10V3L4 14h7v7l9-11h-7z",
        "metric": "90% Reduction"
      },
      {
        "title": "Real-time Data",
        "description": "Access up-to-date information across all your systems instantly",
        "icon": "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        "metric": "Real-time Sync"
      },
      {
        "title": "Cost Savings",
        "description": "Reduce operational costs through streamlined processes and automation",
        "icon": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
        "metric": "40% Savings"
      },
      {
        "title": "Improved Efficiency",
        "description": "Boost productivity with seamless data flow between systems",
        "icon": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        "metric": "60% Faster"
      }
    ]
  },
  "integrationPlatforms": {
    "title": "Supported Platforms",
    "description": "Connect with the platforms you already use and trust",
    "platforms": [
      {
        "name": "E-commerce",
        "platforms": [
          { "name": "Shopify", "logo": "/images/platforms/shopify.png" },
          { "name": "WooCommerce", "logo": "/images/platforms/woocommerce.png" },
          { "name": "Magento", "logo": "/images/platforms/magento.png" },
          { "name": "BigCommerce", "logo": "/images/platforms/bigcommerce.png" }
        ]
      },
      {
        "name": "CRM Systems",
        "platforms": [
          { "name": "Salesforce", "logo": "/images/platforms/salesforce.png" },
          { "name": "HubSpot", "logo": "/images/platforms/hubspot.png" },
          { "name": "Pipedrive", "logo": "/images/platforms/pipedrive.png" },
          { "name": "Zoho CRM", "logo": "/images/platforms/zoho.png" }
        ]
      },
      {
        "name": "Payment Gateways",
        "platforms": [
          { "name": "Stripe", "logo": "/images/platforms/stripe.png" },
          { "name": "PayPal", "logo": "/images/platforms/paypal.png" },
          { "name": "Square", "logo": "/images/platforms/square.png" },
          { "name": "Authorize.net", "logo": "/images/platforms/authorize.png" }
        ]
      },
      {
        "name": "Business Tools",
        "platforms": [
          { "name": "QuickBooks", "logo": "/images/platforms/quickbooks.png" },
          { "name": "Xero", "logo": "/images/platforms/xero.png" },
          { "name": "Slack", "logo": "/images/platforms/slack.png" },
          { "name": "Microsoft 365", "logo": "/images/platforms/microsoft.png" }
        ]
      }
    ]
  },
  "cta": {
    "title": "Ready to Integrate?",
    "subtitle": "Transform your business with seamless NetSuite integrations",
    "description": "Connect your systems, automate workflows, and unlock the full potential of your NetSuite investment. Our expert team will guide you through every step of the integration process.",
    "buttonText": "Start Your Integration",
    "features": [
      "Free consultation",
      "Custom integration design",
      "Expert development team",
      "Ongoing support & maintenance"
    ]
  }
};

export default async function seedIntegration() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/Belletrix');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Integration.deleteMany({});
    console.log('Existing integration data cleared');

    // Seed Integration data
    await Integration.create(integrationData);
    console.log('Integration data seeded');

    console.log('Integration database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding integration database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
} 