import { prisma } from '../../config/prisma';
import { TaskStatus, TaskPriority, Prisma } from '../../../generated';

export const findTaskById = async (id: string) => {
  return prisma.task.findFirst({
    where: { id, deletedAt: null },
    include: {
      assignee: { select: { id: true, fullName: true, email: true } },
      reporter: { select: { id: true, fullName: true, email: true } },
      comments: {
        include: { user: { select: { id: true, fullName: true } } },
        orderBy: { createdAt: 'asc' },
      },
      attachments: true,
      labels: { include: { label: true } },
    },
  });
};

export const findTasksByBoard = async (boardId: string) => {
  return prisma.task.findMany({
    where: { boardId, deletedAt: null },
    orderBy: { createdAt: 'asc' },
    include: { assignee: { select: { id: true, fullName: true } } },
  });
};

export const createTask = async (data: {
  workspaceId: string;
  projectId: string;
  boardId: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  storyPoints?: number;
  assigneeId?: string;
  reporterId: string;
  startDate?: Date;
  dueDate?: Date;
}) => {
  return prisma.task.create({
    data: {
      ...data,
      status: data.status ?? TaskStatus.TODO,
      priority: data.priority ?? TaskPriority.MEDIUM,
    },
  });
};

export const updateTask = async (
  id: string,
  data:
    | Partial<
        Omit<
          Parameters<typeof createTask>[0],
          'workspaceId' | 'projectId' | 'boardId' | 'reporterId'
        >
      >
    | Prisma.TaskUpdateInput
) => {
  return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: string) => {
  return prisma.task.update({ where: { id }, data: { deletedAt: new Date() } });
};

export const moveTask = async (id: string, newBoardId: string) => {
  return prisma.task.update({ where: { id }, data: { boardId: newBoardId } });
};
