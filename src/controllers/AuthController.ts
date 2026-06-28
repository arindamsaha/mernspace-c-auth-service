import { NextFunction, Response } from 'express';
import { RegisterRequestBody } from '../types/index.js';
import { UserServices } from '../services/UserServices.js';
import { Logger } from 'winston';
import createHttpError from 'http-errors';
import { validationResult } from 'express-validator/lib/validation-result.js';




export class AuthController {

    constructor(private userServices: UserServices, private logger: Logger) {}

    async register(req: RegisterRequestBody, res: Response, next: NextFunction) {
        // This is normal send
        //res.status(201).send("User registered successfully");


        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const {firstName, lastName, email, password} = req.body;


        if(!email || !firstName ) {
            

            const error = createHttpError(400, "Email and first name are required");
            next(error);
            return;
        }

        this.logger.debug("Received registration request", {email: email, firstName: firstName, lastName: lastName,password: "********"});

        try {
            const user = await this.userServices.create({firstName, lastName, email, password});

            this.logger.info("User registered successfully"); 

            // This is json send
            res.status(201).json({ message: "User registered successfully" });
        }catch (error) {

            next(error);
            return;
        }

        

        
    }
}