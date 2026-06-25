import {Repository} from 'typeorm';
import { User } from '../entities/User.js';
import { userData } from '../types/index.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';


export class UserServices {

    constructor(private userRepository: Repository<User>) {
    }

    async create({firstName, lastName, email, password}: userData) {


        const existingUser = await this.userRepository.findOne({where: {email: email}});

        if (existingUser) {
            throw createHttpError(400, "User with this email already exists");
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        

        try {

            await this.userRepository.save({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: "customer"
        })

        }catch (err) {
            const error = createHttpError(500, "Failed to store the user data in the database");
            throw error;
        }
        
        
    }
}