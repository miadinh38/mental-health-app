import { Router } from 'express'
import db from '../db/dbConfig.js' // imports connection to the data base

const router = Router()

// Route to get al users
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (!err) {
      res.json(result.rows) // Send results in json format
    } else {
      res.status(500).json({ error: err.message }) // Db error handling
    }
  })
})

// Route to get a single user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.json(result.rows[0]) // Send the first result (user)
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } else {
      res.status(500).json({ error: err.message })
    }
  })
})

// Route to create a new user
router.post('/users', (req, res) => {
  const { username,email,password } = req.body

  db.query(
    'INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *',
    [username, email, password],
    (err, result) => {
      if (!err) {
        res.status(201).json(result.rows[0]) // Send created user
      } else {
        res.status(500).json({ error: err.message })
      }
    },
  )
})

// Route to delete user by ID
router.delete('/users/:id', (req, res) => {
  const { id } = req.params

  db.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id],
    (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          res.json({ message: 'User deleted', user: result.rows[0] })
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } else {
        res.status(500).json({ error: err.message })
      }
    },
  )
})

// Route to update a user by ID
router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { username } = req.body

  db.query(
    'UPDATE users SET username = $1 WHERE id = $2 RETURNING *',
    [username, id],
    (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          res.json(result.rows[0]) //Send the updated user
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } else {
        res.status(500).json({ error: err.message })
      }
    },
  )
})

export default router
