import {Repository} from 'typeorm';
import { User } from '../entities/User.js';
import { userData } from '../types/index.js';
import createHttpError from 'http-errors';

export class UserServices {

    constructor(private userRepository: Repository<User>) {
    }

    async create({firstName, lastName, email, password}: userData) {

        try {

            await this.userRepository.save({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: "customer"
        })

        }catch (err) {
            const error = createHttpError(500, "Failed to store the user data in the database");
            throw error;
        }
        
        
    }
}