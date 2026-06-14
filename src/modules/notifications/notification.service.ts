import * as notificationRepo from './notification.repository';

export const getUserNotifications = async (userId: string, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const notifications = await notificationRepo.findNotificationsByUser(userId, limit, offset);
  const unreadCount = await notificationRepo.countUnread(userId);
  return { notifications, unreadCount, page, limit };
};

export const markAsRead = async (notificationId: string, userId: string) => {
  return notificationRepo.markAsRead(notificationId, userId);
};

export const markAllAsRead = async (userId: string) => {
  return notificationRepo.markAllAsRead(userId);
};

export const deleteNotification = async (notificationId: string, userId: string) => {
  return notificationRepo.deleteNotification(notificationId, userId);
};
