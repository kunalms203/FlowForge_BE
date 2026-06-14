import { prisma } from '../../config/prisma';

export const findNotificationsByUser = async (userId: string, limit = 50, offset = 0) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
};

export const countUnread = async (userId: string) => {
  return prisma.notification.count({ where: { userId, isRead: false } });
};

export const createNotification = async (data: { userId: string; title: string; body: string }) => {
  return prisma.notification.create({ data });
};

export const markAsRead = async (id: string, userId: string) => {
  return prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead: true },
  });
};

export const markAllAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};

export const deleteNotification = async (id: string, userId: string) => {
  return prisma.notification.deleteMany({ where: { id, userId } });
};
