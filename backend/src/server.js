import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

//Starts the server and loads important settings 
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  
})
