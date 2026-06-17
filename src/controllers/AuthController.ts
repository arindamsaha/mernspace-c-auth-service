import { Response } from 'express';
import { RegisterRequestBody } from '../types/index.js';
import { UserServices } from '../services/UserServices.js';




export class AuthController {

    constructor(private userServices: UserServices) {
    }

    async register(req: RegisterRequestBody, res: Response) {
        // This is normal send
        //res.status(201).send("User registered successfully");


        const {firstName, lastName, email, password} = req.body;

        await this.userServices.create({firstName, lastName, email, password});

        // This is json send
        res.status(201).json({ message: "User registered successfully" });
    }
}