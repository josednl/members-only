import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).render('error', {
    title: 'Error',
    message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};
