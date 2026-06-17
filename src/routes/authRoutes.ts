import { Router, type Request, type Response, type NextFunction } from 'express';
import passport from '../config/passport.js';
import * as authController from '../controllers/authController.js';
import { validationResult } from 'express-validator';

const router: Router = Router();

router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.signUpValidation, authController.postSignUp);

router.get('/login', authController.getLogin);
router.post('/login', 
  authController.loginValidation, 
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', { 
        title: 'Login', 
        errors: errors.array(), 
        formData: req.body 
      });
    }
    
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.render('login', { 
          title: 'Login', 
          error: info ? info.message : 'Invalid credentials.', 
          formData: req.body 
        });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  }
);

router.get('/join', authController.getJoin);
router.post('/join', authController.joinValidation, authController.postJoin);

router.post('/logout', authController.postLogout);

export default router;
