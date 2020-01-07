import { Router } from 'express';
import { User } from '../models';
import { APIError } from '../utils/APIError';

export const users = Router();

users.get('', async (req, res, next) => {
  try {
    res.json({
      status: 200,
      data: await User.findAll()
    });
  } catch (err) {
    next(err);
  }
});
