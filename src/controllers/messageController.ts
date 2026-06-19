import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../config/prisma.js';

export const getNewMessage = (req: Request, res: Response) => {
  if (!req.user) return res.redirect('/login');
  res.render('new-message', { title: 'New Message' });
};

export const messageValidation = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required.'),
  body('text').trim().isLength({ min: 1 }).withMessage('Message text is required.'),
];

export const postNewMessage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.redirect('/login');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('new-message', {
      title: 'New Message',
      errors: errors.array(),
      formData: req.body,
    });
  }

  try {
    const { title, text } = req.body;
    await prisma.message.create({
      data: {
        title,
        text,
        authorId: (req.user as any).id,
      },
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
