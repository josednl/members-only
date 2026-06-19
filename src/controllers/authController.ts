import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import prisma from '../config/prisma.js';

export const getSignUp = (req: Request, res: Response) => {
  res.render('sign-up', { title: 'Sign Up' });
};

export const signUpValidation = [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required.'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required.'),
  body('username').trim().isEmail().withMessage('Username must be a valid email.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match.');
    }
    return true;
  }),
];

export const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('sign-up', { 
      title: 'Sign Up', 
      errors: errors.array(),
      formData: req.body 
    });
  }

  try {
    const { username, password, firstName, lastName } = req.body;
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
      return res.render('sign-up', { 
        title: 'Sign Up', 
        error: 'Username already exists.',
        formData: req.body 
      });
    }
    next(err);
  }
};

export const getLogin = (req: Request, res: Response) => {
  res.render('login', { title: 'Login' });
};

export const loginValidation = [
  body('username').notEmpty().trim().isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

export const getJoin = (req: Request, res: Response) => {
  if (!req.user) return res.redirect('/login');
  res.render('join', { title: 'Join the Club' });
};

export const joinValidation = [
  body('passcode').trim().notEmpty().withMessage('Passcode is required.'),
];

export const postJoin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.redirect('/login');
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('join', { title: 'Join the Club', errors: errors.array() });
  }

  const { passcode } = req.body;

  if (passcode === process.env.SECRET_PASSCODE) {
    try {
      await prisma.user.update({
        where: { id: (req.user as any).id },
        data: { isMember: true },
      });
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  } else {
    res.render('join', { title: 'Join the Club', error: 'Incorrect passcode.' });
  }
};
