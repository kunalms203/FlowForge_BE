import { prisma } from '../../config/prisma';

export const findCommentById = async (id: string) => {
  return prisma.comment.findUnique({
    where: { id },
    include: { user: { select: { id: true, fullName: true, email: true } } },
  });
};

export const findCommentsByTask = async (taskId: string) => {
  return prisma.comment.findMany({
    where: { taskId },
    orderBy: { createdAt: 'asc' },
    include: { user: { select: { id: true, fullName: true } } },
  });
};

export const createComment = async (data: { taskId: string; userId: string; content: string }) => {
  return prisma.comment.create({ data });
};

export const updateComment = async (id: string, content: string) => {
  return prisma.comment.update({ where: { id }, data: { content } });
};

export const deleteComment = async (id: string) => {
  return prisma.comment.delete({ where: { id } });
};
