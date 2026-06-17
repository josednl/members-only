import { Router } from 'express';
import passport from '../config/passport.js';
import * as authController from '../controllers/authController.js';

const router: Router = Router();

router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.postSignUp);

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/join', authController.getJoin);
router.post('/join', authController.postJoin);

router.post('/logout', authController.postLogout);

export default router;
