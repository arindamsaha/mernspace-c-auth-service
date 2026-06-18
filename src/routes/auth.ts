import express  from "express";
import {AuthController} from "../controllers/AuthController.js";
import { UserServices } from "../services/UserServices.js";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
import logger from "../config/logger.js";


const userRepository = AppDataSource.getRepository(User);
const router = express.Router();
const userServices = new UserServices(userRepository);
const authController = new AuthController(userServices, logger);



router.post("/register", (req, res, next) => {
  authController.register(req, res, next);
});



export default router;