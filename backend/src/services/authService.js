import { createUser, getUserByEmail, getUserByToken, updatePassword, updateResetToken } from '../models/User.js'
import resetPasswordTemplate from '../templates/resetPasswordEmail.js';
import { sendEmail } from '../utils/emailSender.js';
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error.message);
    throw error;
  }
};

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
    password = await hashPassword(password);

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
    const isValidPassword = await bcrypt.compare(password, hashedPassword) // return true or false

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
    const resetLink = `${process.env.DOMAIN_URL}/reset-password?token=${hashedToken}&email=${encodeURIComponent(email)}&expires=${expiresTimestamp}`;
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

// Reset & update password 
export const resetPasswordService = async({ token, newPassword }) => {
  try {
    const user = await getUserByToken({token});
    if(!user) {
      return {
        errMessage: 'Invalid or expired token',
        errCode: 1,
      }    
    }

    //Compare new input password vs old password
    const oldHashedPassword = user.password;
    const hasedPassowrd = await hashPassword(newPassword)

    const isMatch = await bcrypt.compare(newPassword, oldHashedPassword);

    if(isMatch) {
      return {
        errMessage: 'Your new password must be different from your previous password.',
        errCode: 1,
      }
    }

    await updatePassword({ token, hasedPassowrd })
    return {
      errMessage: 'Password reset successfully!',
      errCode: 0,
    }
  } catch (error) {
    console.error('Error from resetPasswordService:', error.message)
    return { status: 500, message: 'Server error' }
  }
}
