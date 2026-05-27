import winston from "winston";
import { Configs } from "../config/index.js";

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "auth-service" },
  format: winston.format.json(),
  transports: [
    new winston.transports.File(
        { 
            dirname: "logs",
            filename: "error.log",
            level: "error",
            silent: Configs.NODE_ENV === "test" // Disable file logging during tests 
        }
    ),
    new winston.transports.File(
        { 
            dirname: "logs",
            filename: "combined.log",
            format: winston.format.combine( winston.format.timestamp(), winston.format.json() ),
            level: "info", 
            silent: Configs.NODE_ENV === "test" // Disable file logging during tests
        }
    ),
    new winston.transports.Console({
        format: winston.format.combine( winston.format.timestamp(), winston.format.json() ),
        level: "info",
        silent: Configs.NODE_ENV === "test" // Disable console logging during tests
    }),
  ],
});

export default logger;