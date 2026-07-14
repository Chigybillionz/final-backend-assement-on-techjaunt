import request from "supertest";
import app from "../../src/app";

describe("Authentication", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          firstName: "Test",
          lastName: "User",
          email: `test${Date.now()}@example.com`,
          password: "Password123!",
          phone: "08012345678",
          role: "customer",
        });

      expect(response.status).toBe(201);

      expect(response.body.success).toBe(true);

      expect(response.body.data).toBeDefined();
    });
  });
});
