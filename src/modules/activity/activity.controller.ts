import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as activityService from './activity.service';

export const getWorkspaceActivities = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { workspaceId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const result = await activityService.getWorkspaceActivities(workspaceId, page, limit);
  res.json({ success: true, data: result });
});

export const getProjectActivities = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const result = await activityService.getProjectActivities(projectId, page, limit);
  res.json({ success: true, data: result });
});

export const getTaskActivities = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const result = await activityService.getTaskActivities(taskId, page, limit);
  res.json({ success: true, data: result });
});
