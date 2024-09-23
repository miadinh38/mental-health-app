// import { Router } from "express";

// const router = Router();

// //route to get users
// router.get("/users", (req,res) => {
// //let users = sintaxis para traer users de bd 
// // res.send(users)
// //req solicitar
// //res lo que manda
// //
//     res.send("Getting users")
// });

// //route to get user
// router.get("/users/:id", (req,res) => {
//     const {id} = req.params
//     res.send("Getting user" + id)
// });

// //route to create user
// router.post("/users", (req,res) => {
//     let name= req.body.name
//     res.send("Saving users: " + name)
// });

// //route to delete user
// router.delete("/users/:id", (req,res) => {
//     res.send("Deleting user")
// });
// //router to update user
// router.put("/users/:id", (req,res) => {
//     const {id} = req.params
//     res.send("updating user" + id)
// });

// export default router;

import { Router } from "express";
import db from '../db/dbConfig.js';// imports connection to the data base



const router = Router();

// Route to get al users
router.get("/users", (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (!err) {
      res.json(result.rows);  // Send results in json format
    } else {
      res.status(500).json({ error: err.message });  // Db error handling
    }
  });
});

// Route to get a single user by ID
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);  // Send the first result (user)
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

// Route to create a new user
router.post("/users", (req, res) => {
  const { name } = req.body;

  db.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name], (err, result) => {
    if (!err) {
      res.status(201).json(result.rows[0]);  // Send created user
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

// Route to delete user by ID
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.json({ message: "User deleted", user: result.rows[0] });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

// Route to update a user by ID
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, id], (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);  //Send the updated user
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

export default router;
