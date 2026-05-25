import {Configs} from "./config";
import app from "./app";
import logger from "./config/logger";

console.log(Configs.PORT);


function startServer() {
    const PORT = Configs.PORT;

    try {
       
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
