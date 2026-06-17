import {Repository} from 'typeorm';
import { User } from '../entities/User.js';
import { userData } from '../types/index.js';

export class UserServices {

    constructor(private userRepository: Repository<User>) {
    }

    async create({firstName, lastName, email, password}: userData) {


        
        await this.userRepository.save({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    }
}