import { createUser, getUserByEmail, updateResetToken } from '../models/User.js'
import resetPasswordTemplate from '../templates/resetPasswordEmail.js';
import { sendEmail } from '../utils/emailSender.js';
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Register user
export const registerUser = async ({
  name,
  email,
  password,
  gender,
  birthday,
  phone,
}) => {
  try {
    //Check if user exists
    const isEmailExist = await getUserByEmail(email)
    if (isEmailExist.length > 0) {
      return {
        errMessage: 'This email is registered',
        errCode: 1,
      }
    }

    //Hash password
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    password = hashedPassword

    const newUser = await createUser({
      name,
      email,
      password,
      gender,
      birthday,
      phone,
    })

    // Generate JWT token
    const token = generateToken(newUser)

    return {
      errMessage: 'User created succesfully!',
      errCode: 0,
      token,
    }
  } catch (error) {
    console.error('Error from registerUser service: ', error.message)
    throw error
  }
}

// Login user
export const loginUser = async ({ email, password }) => {
  try {
    // Check if user is reqgistered
    const user = await getUserByEmail(email)
    if (user.length === 0) {
      return {
        errMessage: 'Email or password is incorrect',
        errCode: 1,
      }
    }

    // Check password
    const hashedPassword = user[0].password
    const isValidPassword = await bcrypt.compareSync(password, hashedPassword) // return true or false

    if (!isValidPassword) {
      return {
        errMessage: 'Email or password is incorrect',
        errCode: 1,
      }
    }

    // Generate JWT token
    const token = generateToken(user[0])

    return {
      errMessage: 'User login succesfully!',
      errCode: 0,
      token,
    }
  } catch (error) {
    console.error('Login error:', error)
    return { status: 500, message: 'Server error' }
  }
}

// Forgot password
export const forgotPasswordService = async ({ email }) => {
  try {
    
    //Check if user exists/ Validate email
    const isEmailExist = await getUserByEmail(email)
    if (isEmailExist.length === 0) {
      return {
        errMessage: 'This account cannot be found',
        errCode: 1,
      }
    }
  
    //Generate a reset token & format expires
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 60*60*1000) // 1hr from now
    const expiresTimestamp = Math.floor(expires.getTime() / 1000); // Convert to seconds
  
    // Save hased token and expires to the db
    const updatedUser = await updateResetToken({hashedToken, expires, email});

    
    // Create a reset link & Send email with the reset link
    const resetLink = `${process.env.DOMAIN_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}&expires=${expiresTimestamp}`;
    await sendEmail(
      email, 
      'Reset your password',
      resetPasswordTemplate(resetLink, updatedUser.name)
    );
    return {
      errMessage: 'Reset link sent! Please check your email.',
      errCode: 0,
    };
  } catch (error) {
    console.error('Error from forgotPasswordService:', error.message)
    return { status: 500, message: 'Server error' }
  }  
}
