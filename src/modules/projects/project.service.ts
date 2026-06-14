import { AppError } from '../../common/errors/AppError';
import * as projectRepo from './project.repository';

export const getProjectById = async (projectId: string, userId: string) => {
  const project = await projectRepo.findProjectById(projectId);
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

export const getWorkspaceProjects = async (workspaceId: string, userId: string) => {
  return projectRepo.findProjectsByWorkspace(workspaceId);
};

export const createProject = async (workspaceId: string, userId: string, data: { name: string; description?: string }) => {
  return projectRepo.createProject({ workspaceId, ...data });
};

export const updateProject = async (projectId: string, userId: string, data: { name?: string; description?: string }) => {
  const project = await projectRepo.findProjectById(projectId);
  if (!project) throw new AppError('Project not found', 404);
  return projectRepo.updateProject(projectId, data);
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await projectRepo.findProjectById(projectId);
  if (!project) throw new AppError('Project not found', 404);
  return projectRepo.deleteProject(projectId);
};

export const addMember = async (projectId: string, userId: string, targetUserId: string) => {
  return projectRepo.addProjectMember(projectId, targetUserId);
};

export const removeMember = async (projectId: string, userId: string, targetUserId: string) => {
  return projectRepo.removeProjectMember(projectId, targetUserId);
};
