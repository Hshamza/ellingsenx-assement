import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET! || 'TuZSv0LqzKRvJ18ul0SHNxoLqoeHlb9p9CNHdD3fNqrb04DA+V9ofinSsjOA4E8K5TaP7fBEdpzG1EjAk4BTQg==';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION! || '60m';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION! || '24h';
const EMAIL_USERNAME = process.env.EMAIL_USERNAME! || 'admin';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD! || '123';
const EMAIL_FROM = process.env.EMAIL_FROM! || 'mohammad.hamza75.hs@gmail.com';

// Registration
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
    const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    // Create the password reset URL
    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: 'your_email_service',
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: EMAIL_FROM,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Password reset email sent:', info.response);
      res.json({ message: 'Password reset email sent' });
    });
  } catch (err) {
    console.error('Error during password reset:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
