import "reflect-metadata";
import {Configs} from "./config/index.js";
import app from "./app.js";
import {AppDataSource} from "./config/data-source.js";
import logger from "./config/logger.js";

console.log(Configs.PORT);


async function startServer() {
    const PORT = Configs.PORT;

    try {
        
        await AppDataSource.initialize();
        logger.info("Database connection established successfully.");

        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });
    } catch (error) {
        logger.error("Error starting server:", error);
        process.exit(1);
    }
    // Your server code here
}
startServer();
