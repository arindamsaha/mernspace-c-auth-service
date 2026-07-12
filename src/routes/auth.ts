import express, { NextFunction }  from "express";
import {AuthController} from "../controllers/AuthController.js";
import { UserServices } from "../services/UserServices.js";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
import logger from "../config/logger.js";
import { body } from "express-validator/lib/middlewares/validation-chain-builders.js";
import registerValidator from "../validators/register-validator.js";
import { TokenService } from "../services/TokenService.js";


const userRepository = AppDataSource.getRepository(User);
const router = express.Router();
const userServices = new UserServices(userRepository);
const tokenService = new TokenService();
const authController = new AuthController(userServices, logger, tokenService);



router.post("/register", registerValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  authController.register(req, res, next);
});



export default router;