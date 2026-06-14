import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as workspaceService from './workspace.service';

export const getWorkspaces = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workspaces = await workspaceService.getUserWorkspaces(req.user!.id);
  res.json({ success: true, data: workspaces });
});

export const getWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workspace = await workspaceService.getWorkspaceById(req.params.workspaceId, req.user!.id);
  res.json({ success: true, data: workspace });
});

export const createWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const workspace = await workspaceService.createWorkspace(req.user!.id, name);
  res.status(201).json({ success: true, message: 'Workspace created', data: workspace });
});

export const updateWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workspace = await workspaceService.updateWorkspace(req.params.workspaceId, req.user!.id, req.body);
  res.json({ success: true, message: 'Workspace updated', data: workspace });
});

export const deleteWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  await workspaceService.deleteWorkspace(req.params.workspaceId, req.user!.id);
  res.json({ success: true, message: 'Workspace deleted' });
});
