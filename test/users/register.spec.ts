import request from "supertest";
import {describe, expect, it} from '@jest/globals';
import app from "../../src/app";
describe("POST /auth/register", () => {
  
    describe("given valid user data", () => {
        it("should register the user and return a success message", async () => { 
            // Arrange
            const userData = {
                firstName: "testuser",
                lastName: "testuser",
                email: "testuser@example.com",
                password: "TestPassword123!",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // Assert
            expect(response.statusCode).toBe(201);
            
        });

        it("should register the user and return a success message", async () => { 
            // Arrange
            const userData = {
                firstName: "testuser",
                lastName: "testuser",
                email: "testuser@example.com",
                password: "TestPassword123!",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // Assert
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });


});

