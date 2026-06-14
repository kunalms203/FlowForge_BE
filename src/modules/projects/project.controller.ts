import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as projectService from './project.service';

export const getProjects = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { workspaceId } = req.params;
  const projects = await projectService.getWorkspaceProjects(workspaceId, req.user!.id);
  res.json({ success: true, data: projects });
});

export const getProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const project = await projectService.getProjectById(projectId, req.user!.id);
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { workspaceId } = req.params;
  const project = await projectService.createProject(workspaceId, req.user!.id, req.body);
  res.status(201).json({ success: true, message: 'Project created', data: project });
});

export const updateProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const project = await projectService.updateProject(projectId, req.user!.id, req.body);
  res.json({ success: true, message: 'Project updated', data: project });
});

export const deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  await projectService.deleteProject(projectId, req.user!.id);
  res.json({ success: true, message: 'Project deleted' });
});
