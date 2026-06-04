import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User.js"
import { Configs } from "./index.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Configs.DB_HOST,
    port: parseInt(Configs.DB_PORT as string),
    username: Configs.DB_USERNAME,
    password: Configs.DB_PASSWORD,
    database: Configs.DB_NAME,
    synchronize: Configs.NODE_ENV == 'test' || Configs.NODE_ENV == 'dev' ? true : false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
