import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bellatrix API',
      version: '1.0.0',
      description: 'API documentation for Bellatrix NetSuite consultancy platform',
      contact: {
        name: 'Bellatrix Support',
        email: 'support@bellatrix.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5005',
        description: 'Development server',
      },
      {
        url: 'https://api.bellatrix.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            error: {
              type: 'string',
              description: 'Detailed error information',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
            },
            isAdmin: {
              type: 'boolean',
              description: 'Admin status',
            },
            image: {
              type: 'string',
              description: 'Profile image path',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        Service: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Service ID',
            },
            name: {
              type: 'string',
              description: 'Service name',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly service identifier',
            },
            description: {
              type: 'string',
              description: 'Service description',
            },
            isActive: {
              type: 'boolean',
              description: 'Service status',
            },
            hero: {
              type: 'object',
              description: 'Hero section content',
            },
            benefits: {
              type: 'object',
              description: 'Benefits section content',
            },
            modules: {
              type: 'object',
              description: 'Modules section content',
            },
            pricing: {
              type: 'object',
              description: 'Pricing section content',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/*.js',
    './controllers/**/*.js',
    './index.js',
  ],
};

const specs = swaggerJSDoc(options);

const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2563eb; font-size: 2rem; }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 15px; border-radius: 5px; }
  `,
  customSiteTitle: 'Bellatrix API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
};

export { specs, swaggerUi, swaggerOptions };