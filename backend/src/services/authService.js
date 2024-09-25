import { createUser, getUserByEmail } from '../models/User.js';
import bcrypt from 'bcrypt';

// Register user
export const registerUser = async ({ name, email, password, gender, birthday, phone }) => {
  try {
    //Check if user exists
    const isEmailExist = await getUserByEmail(email);
    if(isEmailExist.length > 0) {
      return {
        errMessage: "This email is registered",
        errCode: 1
      }
    }
  
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
  
    const newUser = await createUser({name, email, password, gender, birthday, phone})
    console.log("new user ", newUser)
    return {
      errMessage: "User created succesfully!",
      errCode: 0
    };
  } catch (error) {
    console.error('Error from registerUser service: ', error.message)
    throw error
  }
  
};



// // Login user

// export const loginUser = async ({ email, password }) => {
//   console.log('Logging in user with email:', email);

//   try {
//     const query = `SELECT * FROM users WHERE email = $1`;
//     const result = await pool.query(query, [email]);

//     if (result.rows.length === 0) {
//       return { status: 404, message: 'User not found' };
//     }

//     const user = result.rows[0];
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return { status: 400, message: 'Invalid password' };
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return { status: 200, token };
//   } catch (error) {
//     console.error('Login error:', error);
//     return { status: 500, message: 'Server error' };
//   }
// };




// import bcrypt from 'bcrypt'
// import pool from '../db.js'
// import { generateToken } from '../utils/jwt.js'

// //Register
// export const register = async (req, res) => {
//   const { name, email, password } = req.body

//   try {
//     // Check if user already exists
//     const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
//       email,
//     ])
//     if (userCheck.rows.length > 0) {
//       return res.status(400).json({ error: 'User already exists' })
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Store user in the database
//     const result = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
//       [name, email, hashedPassword],
//     )

//     // Generate JWT token
//     const token = generateToken(result.rows[0])

//     res.status(201).json({ message: 'User registered', token })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// //Login
// export const login = async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [
//       email,
//     ])

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' })
//     }

//     const user = result.rows[0]

//     // Check if password matches
//     const isValidPassword = await bcrypt.compare(password, user.password)
//     if (!isValidPassword) {
//       return res.status(400).json({ error: 'Invalid password' })
//     }

//     // Generate JWT token
//     const token = generateToken(user)

//     res.status(200).json({ message: 'Login successful', token })
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' })
//   }
// }

// //Logout
// export const logout = (req, res) => {
//   res.status(200).json({ message: 'Logout successful' })
// }
