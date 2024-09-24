import pg from "pg";
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const db = new Pool(dbParams)

export default db;
