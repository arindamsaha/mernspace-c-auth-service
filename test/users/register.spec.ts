import request from "supertest";
import {beforeAll,beforeEach, afterAll,describe, expect, it} from '@jest/globals';
import app from "../../src/app";
import {DataSource} from "typeorm";
import {AppDataSource} from "../../src/config/data-source";
import {User} from "../../src/entities/User";
import { truncateTables } from "../utils";




describe("POST /auth/register", () => {
  
    describe("given valid user data", () => {

        let connections: DataSource;

        beforeAll(async () => {
            connections = await AppDataSource.initialize();
        });

        beforeEach(async () => {
            await truncateTables(connections);
            //await connections.getRepository(User).clear();
        });

        afterAll(async () => {
            await connections.destroy();
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


        it("It should persist the user in the database", async () => { 

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
            const userRepository = connections.getRepository(User);

            const user = await userRepository.find();

            expect(user.length).toHaveLength(1);


        });
    });


});

