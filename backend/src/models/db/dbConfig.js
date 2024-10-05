import pg from 'pg'
const { Pool } = pg
import dotenv from 'dotenv'

dotenv.config()

const connectionString =
  process.env.DB_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`

const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Check connection
// db.connect()
//   .then(() => {
//     console.log('Database connected successfully!');
//   })
//   .catch(err => {
//     console.error('Database connection error:', err.stack);
//   });

export default db
