import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as notificationService from './notification.service';

export const getNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const result = await notificationService.getUserNotifications(req.user!.id, page, limit);
  res.json({ success: true, data: result });
});

export const markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { notificationId } = req.params;
  await notificationService.markAsRead(notificationId, req.user!.id);
  res.json({ success: true, message: 'Notification marked as read' });
});

export const markAllAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  await notificationService.markAllAsRead(req.user!.id);
  res.json({ success: true, message: 'All notifications marked as read' });
});

export const deleteNotification = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { notificationId } = req.params;
  await notificationService.deleteNotification(notificationId, req.user!.id);
  res.json({ success: true, message: 'Notification deleted' });
});
