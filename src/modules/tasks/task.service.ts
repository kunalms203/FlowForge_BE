import { AppError } from '../../common/errors/AppError';
import * as taskRepo from './task.repository';
import { TaskStatus, TaskPriority } from '../../../generated/prisma/client';

export const getTaskById = async (taskId: string, userId: string) => {
  const task = await taskRepo.findTaskById(taskId);
  if (!task) throw new AppError('Task not found', 404);
  return task;
};

export const getBoardTasks = async (boardId: string, userId: string) => {
  return taskRepo.findTasksByBoard(boardId);
};

export const createTask = async (
  workspaceId: string,
  projectId: string,
  boardId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    storyPoints?: number;
    assigneeId?: string;
    startDate?: Date;
    dueDate?: Date;
  }
) => {
  return taskRepo.createTask({
    workspaceId,
    projectId,
    boardId,
    reporterId: userId,
    ...data,
  });
};

export const updateTask = async (taskId: string, userId: string, data: any) => {
  const task = await taskRepo.findTaskById(taskId);
  if (!task) throw new AppError('Task not found', 404);
  return taskRepo.updateTask(taskId, data);
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await taskRepo.findTaskById(taskId);
  if (!task) throw new AppError('Task not found', 404);
  return taskRepo.deleteTask(taskId);
};

export const moveTask = async (taskId: string, newBoardId: string, userId: string) => {
  const task = await taskRepo.findTaskById(taskId);
  if (!task) throw new AppError('Task not found', 404);
  return taskRepo.moveTask(taskId, newBoardId);
};
