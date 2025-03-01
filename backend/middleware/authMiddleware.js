import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {isBlacklisted} from '../utils/tokenBlacklist.js';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided.'});
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({message: 'Token has been invalidated'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({message: 'Invalid token'});
  }
};

export default authMiddleware;
