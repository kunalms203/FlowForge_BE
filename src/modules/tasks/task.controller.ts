import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as taskService from './task.service';

export const getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  const tasks = await taskService.getBoardTasks(boardId, req.user!.id);
  res.json({ success: true, data: tasks });
});

export const getTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const task = await taskService.getTaskById(taskId, req.user!.id);
  res.json({ success: true, data: task });
});

export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { workspaceId, projectId, boardId } = req.params;
  const task = await taskService.createTask(workspaceId, projectId, boardId, req.user!.id, req.body);
  res.status(201).json({ success: true, message: 'Task created', data: task });
});

export const updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const task = await taskService.updateTask(taskId, req.user!.id, req.body);
  res.json({ success: true, message: 'Task updated', data: task });
});

export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  await taskService.deleteTask(taskId, req.user!.id);
  res.json({ success: true, message: 'Task deleted' });
});

export const moveTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { newBoardId } = req.body;
  const task = await taskService.moveTask(taskId, newBoardId, req.user!.id);
  res.json({ success: true, message: 'Task moved', data: task });
});
