import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "AutoLease API",
      version: "1.0.0",
      description: "AutoLease Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  // Swagger will scan every TypeScript file under src
  apis: ["src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
