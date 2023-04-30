import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./domain/User"

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "rootpass",
    database: "uni_ddd",
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/domain/*.{js,ts}'],
    migrations: ["./build/migrations/*.js"],
    subscribers: [],
})
