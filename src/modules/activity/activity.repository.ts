import { prisma } from '../../config/prisma';

export const findActivitiesByWorkspace = async (workspaceId: string, limit = 50, offset = 0) => {
  return prisma.activityLog.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
    include: { actor: { select: { id: true, fullName: true, email: true } } },
  });
};

export const findActivitiesByProject = async (projectId: string, limit = 50, offset = 0) => {
  return prisma.activityLog.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
    include: { actor: { select: { id: true, fullName: true } } },
  });
};

export const findActivitiesByTask = async (taskId: string, limit = 50, offset = 0) => {
  return prisma.activityLog.findMany({
    where: { taskId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
    include: { actor: { select: { id: true, fullName: true } } },
  });
};

export const createActivity = async (data: {
  workspaceId: string;
  projectId?: string;
  taskId?: string;
  actorId: string;
  action: string;
  oldValues?: any;
  newValues?: any;
}) => {
  return prisma.activityLog.create({ data });
};
