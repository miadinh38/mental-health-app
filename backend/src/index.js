import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the mental health app" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import helmet from "helmet";
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();

// if (!process.env.PORT) {
//   console.log(`No port value specified...`);
// }

// const app = express();
// const PORT = parseInt(process.env.PORT, 10) || 8000;

// // Middewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(helmet());

// // Routes
// app.use('/auth', authRoutes); // Conecta las rutas de autenticación bajo el prefijo /auth

// app.get('/', (req, res) => {
//   res.json({ message: "Welcome to the mental health app" });
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


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
