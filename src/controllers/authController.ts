import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';

export const getSignUp = (req: Request, res: Response) => {
  res.render('sign-up', { title: 'Sign Up' });
};

export const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    
    // Basic validation (ideally use a library like express-validator, but keeping it simple as per instructions)
    if (!username || !password || !firstName || !lastName) {
      return res.render('sign-up', { title: 'Sign Up', error: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    res.redirect('/login');
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.render('sign-up', { title: 'Sign Up', error: 'Username already exists.' });
    }
    next(err);
  }
};

export const getLogin = (req: Request, res: Response) => {
  res.render('login', { title: 'Login' });
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
