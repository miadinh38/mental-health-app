import express from "express";
import * as dotenv from  "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

if(!process.env.PORT) {
  console.log(`No port value specified...`);
}

const app = express();
const PORT = parseInt(process.env.PORT, 10);

// Middewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
  res.json({message: "Helllo World"})
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});