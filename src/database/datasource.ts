import "reflect-metadata";

import { DataSource } from "typeorm";

import { env } from "../config/env";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: env.database.host,

  port: env.database.port,

  username: env.database.username,

  password: env.database.password,

  database: env.database.database,

  synchronize: false,

  logging: env.nodeEnv === "development",

  entities: [__dirname + "/../entities/*.{ts,js}"],

  migrations: [__dirname + "/migrations/*.{ts,js}"],

  subscribers: [__dirname + "/../subscribers/*.{ts,js}"],
});
