import { Request, Response } from 'express';

export class AuthController {

    register(req: Request, res: Response) {
        // This is normal send
        //res.status(201).send("User registered successfully");


        // This is json send
        res.status(201).json({ message: "User registered successfully" });
    }
}