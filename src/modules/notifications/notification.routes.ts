import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from './notification.controller';

const router = Router();
router.use(authenticate);

router.get('/', getNotifications);
router.put('/:notificationId/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:notificationId', deleteNotification);

export default router;
