import { Router } from 'express';
import * as messageController from '../controllers/messageController.js';

const router: Router = Router();

router.get('/new', messageController.getNewMessage);
router.post('/', messageController.messageValidation, messageController.postNewMessage);
router.post('/:id/delete', messageController.deleteMessage);

export default router;
