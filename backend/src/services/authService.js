import { createUser, getUserByEmail } from '../models/User.js';
import { generateToken } from "../utils/jwt.js"
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
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    password = hashedPassword;
  
    const newUser = await createUser({name, email, password, gender, birthday, phone})

    // Generate JWT token
    const token = generateToken(newUser.id)

    return {
      errMessage: "User created succesfully!",
      errCode: 0,
      token
    };
  } catch (error) {
    console.error('Error from registerUser service: ', error.message)
    throw error
  }
  
};


// Login user
export const loginUser = async ({ email, password }) => {
  
  try {
    // Check if user is reqgistered
    const user = await getUserByEmail(email);
    if (user.length === 0) {
      return {
        errMessage: "Email or password is incorrect",
        errCode: 1
      }
    }
    
    // Check password 
    const hashedPassword = user[0].password;
    const isValidPassword = await bcrypt.compareSync(password, hashedPassword); // return true or false
    
    if (!isValidPassword) {
      return {
        errMessage: "Email or password is incorrect",
        errCode: 1
      }    
    }

    // Generate JWT token
    const token = generateToken(user[0].id)
    
    return {
      errMessage: "User login succesfully!",
      errCode: 0,
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    return { status: 500, message: 'Server error' };
  }
};