import fs from 'fs';
import path from 'path';
import { NextFunction, Response } from 'express';
import { RegisterRequestBody } from '../types/index.js';
import { UserServices } from '../services/UserServices.js';
import { Logger } from 'winston';
import createHttpError from 'http-errors';
import {sign} from 'jsonwebtoken';
import { validationResult } from 'express-validator/lib/validation-result.js';
import { Configs } from '../config/index.js';




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
            let privateKey: Buffer;

            try {

                const keyPath = path.join(process.cwd(), "keys", "privateKey.pem");

                privateKey = fs.readFileSync(keyPath);


                 //privateKey = fs.readFileSync(path.join(path.join(__dirname, '../../keys/privateKey.pem')));
            } catch (error) {

                const err = createHttpError(500, "Failed to read the private key for signing JWT");
                next(err);
                return;
            }


            const accessToken = sign({ sub: String(user.id), role: user.role }, privateKey ,
             { 
                expiresIn: '1h',
                algorithm: 'RS256',
                issuer: 'auth-service',
            });

            const refreshToken = sign({ sub: String(user.id), role: user.role }, Configs.REFRESH_TOKEN_SECRET!, 
            {
                expiresIn: '7d',
                algorithm: 'HS256',
                issuer: 'auth-service'
            });

            res.cookie('accessToken', accessToken, { domain: 'localhost', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 15 * 60 * 1000  });
            res.cookie('refreshToken', refreshToken, { domain: 'localhost', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 1000  });
            // This is json send
            res.status(201).json({ message: "User registered successfully" });
        }catch (error) {

            next(error);
            return;
        }

        

        
    }
}