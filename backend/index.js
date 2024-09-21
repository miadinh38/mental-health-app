import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";


dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8000; // Establece un puerto por defecto si no está en .env

// Middewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});




// import { sequelize } from './src/db/dbConfig.js';
// import { User } from './src/db/models.js';

//     });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection success');
//     return sequelize.sync();
//   })
//   .then(() => {
//     console.log('Sync models');
//     app.listen(PORT, () => {
//       console.log(`Server listening on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Connection fail', error);
//   });
