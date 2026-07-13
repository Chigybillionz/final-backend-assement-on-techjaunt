import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "AutoLease Rental API",
      version: "1.0.0",
      description:
        "A RESTful Vehicle Rental Platform built with Node.js, Express, TypeScript, PostgreSQL, TypeORM and Cloudinary.",

      contact: {
        name: "AutoLease API Team",
        email: "support@autolease.com",
      },

      license: {
        name: "MIT",
      },
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

    tags: [
      {
        name: "Authentication",
        description: "User authentication and account management.",
      },
      {
        name: "Vehicles",
        description: "Manage vehicle listings and images.",
      },
      {
        name: "Bookings",
        description: "Create and manage vehicle bookings.",
      },
      {
        name: "Payments",
        description: "Initialize and verify rental payments.",
      },
      {
        name: "Reviews",
        description: "Customer reviews and ratings for vehicles.",
      },
      {
        name: "Favorites",
        description: "Manage favorite vehicles.",
      },
      {
        name: "Customer Dashboard",
        description: "Customer dashboard operations.",
      },
      {
        name: "Owner Dashboard",
        description: "Vehicle owner dashboard operations.",
      },
      {
        name: "Admin Dashboard",
        description: "Administrative statistics and management.",
      },
    ],
  }, // Swagger will scan every TypeScript file under src
  apis: ["src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
