import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {addToBlacklist} from '../utils/tokenBlacklist.js';

// User Registeration
export const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // check if user already exists
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: 'User already exists'});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    //  check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // generate JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {id: user._id, name: user.name, email: user.email},
      expiresIn: 604800,
    });
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

// User Logout
export const logout = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(400).json({message: 'No token provided.'});

  addToBlacklist(token);
  res.json({message: 'Logged out successfully'});
};
