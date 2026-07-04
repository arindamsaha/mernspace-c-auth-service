import request from 'supertest';
import {
    beforeAll,
    beforeEach,
    afterAll,
    describe,
    expect,
    it,
} from '@jest/globals';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entities/User';
import { isJwt, truncateTables } from '../utils';

describe('POST /auth/register', () => {
    let connections: DataSource;
    beforeAll(async () => {
        connections = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await connections.dropDatabase();
        await connections.synchronize();
        //await truncateTables(connections);
        //await connections.getRepository(User).clear();
    });

    afterAll(async () => {
        await connections.destroy();
    });
    describe('given valid user data', () => {
        it('should register the user and return a success message', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };
            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(response.statusCode).toBe(201);
        });

        it('should register the user and return a success message', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };
            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'),
            );
        });

        it('It should persist the user in the database', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };
            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            const userRepository = connections.getRepository(User);

            const user = await userRepository.find();

            expect(user).toHaveLength(1);
            expect(user[0].firstName).toBe(userData.firstName);
            expect(user[0].lastName).toBe(userData.lastName);
            expect(user[0].email).toBe(userData.email);
        });

        it('User should be a Customer only', async () => {
            // Arrange
            const userData = {
                firstName: 'roleCustomer',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'role Customer!',
            };
            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            const userRepository = connections.getRepository(User);

            const user = await userRepository.find();

            expect(user).toHaveLength(1);
            expect(user[0].role).toBe('customer');
        });

        it('should store hashed password in the database', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };

            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert

            const userRepository = connections.getRepository(User);
            const user = await userRepository.find();
            console.log('hashedPassword', user[0].password);

            expect(user[0].password).not.toBe(userData.password);
        });

        it('Email should be unique', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };

            const userRepository = connections.getRepository(User);
            const user = await userRepository.save({
                ...userData,
                role: 'customer',
            });

            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert
            const users = await userRepository.find();

            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(1);
        });
        it('should return theaccess token and refrash token inside a cookie', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: 'testuser@example.com',
                password: 'janina!',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            interface Headers {
                'set-cookie': string[];
            }
            // Assert
            let accessTokenCookie = null;
            let refreshTokenCookie = null;

            const cookies = response.headers['set-cookie'] as unknown as string[];

            cookies.forEach((cookie: string) => {
                if(cookie.startsWith('accessToken=')) {
                    accessTokenCookie = cookie.split(';')[0].split('=')[1];
                }
                if(cookie.startsWith('refreshToken=')) {
                    refreshTokenCookie = cookie.split(';')[0].split('=')[1];
                }
            });
            expect(accessTokenCookie).not.toBeNull();
            expect(refreshTokenCookie).not.toBeNull();

            expect(isJwt(accessTokenCookie)).toBeTruthy();
            expect(isJwt(refreshTokenCookie)).toBeTruthy();

        });

        
    });

    describe('given valid user data', () => {
        it('should return 400 if Email is missing', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: '',
                password: 'janina!',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert

            expect(response.statusCode).toBe(400);

            const userRepository = connections.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        
    });

    describe('Field sanitization', () => {
        it('should trim whitespace from email', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: ' arindam@example.com ',
                password: 'janina!',
            };
            // Act
           await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert


            const userRepository = connections.getRepository(User);
            const users = await userRepository.find();
            expect(users[0].email).toBe('arindam@example.com');
        });

        it('should return 400 for an invalid email', async () => {
            // Arrange
            const userData = {
                firstName: 'testuser',
                lastName: 'testuser',
                email: ' arindam@example.com ',
                password: 'janina!',
            };
            // Act
           await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert


            const userRepository = connections.getRepository(User);
            const users = await userRepository.find();
             expect(users).toHaveLength(1);
        });
        it('should return 400 if FirstName is missing', async () => {
            // Arrange
            const userData = {
                firstName: '',
                lastName: 'testuser',
                email: 'arindam@example.com',
                password: 'janina!',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert

            expect(response.statusCode).toBe(400);

            const userRepository = connections.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });
    });
});
