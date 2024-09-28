import * as dotenv from 'dotenv'
dotenv.config()

// other dependencies
import fs from 'fs'
import chalk from 'chalk'
import db from './dbConfig.js'
import pg from 'pg'
const { Client } = pg

// pg connection setup
// const connectionString =
//   process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`
// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`))
  const schemaFilenames = fs.readdirSync('src/models/db/schema')

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`src/models/db/schema/${fn}`, 'utf8')
    console.log(`\t-> Running ${chalk.green(fn)}`)
    await db.query(sql)
  }
}

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`))
  const schemaFilenames = fs.readdirSync('src/models/db/seeds')

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`src/models/db/seeds/${fn}`, 'utf8')
    console.log(`\t-> Running ${chalk.green(fn)}`)
    await db.query(sql)
  }
}

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(
        `-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`,
      )

    await runSchemaFiles()
    await runSeedFiles()
    process.exit()
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`))
    process.exit()
  }
}

runResetDB()
