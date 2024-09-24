import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import usersRoutes from './src/routes/usersRoutes.js'

dotenv.config()

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const app = express()
const PORT = parseInt(process.env.PORT, 10) || 8000 // sets up a default port if not present inside the .env

// Middewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(usersRoutes)

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
