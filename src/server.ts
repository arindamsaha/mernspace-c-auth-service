import {Configs} from "./config";
import app from "./app";

console.log(Configs.PORT);


function startServer() {
    const PORT = Configs.PORT;

    try {
       
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
    // Your server code here
}
startServer();
