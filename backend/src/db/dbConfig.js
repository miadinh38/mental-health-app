// import pg from "pg";
// const { Pool } = pg;

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// }

// const db = new Pool(dbParams);

// export default db;

import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();


const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: 5432,
  dialect: 'postgres',
});

