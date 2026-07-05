import { AppError } from '../../common/errors/AppError';
import * as workspaceRepo from './workspace.repository';
import { WorkspaceRole } from '@prisma/client';

export const getWorkspaceById = async (workspaceId: string, userId: string) => {
  const workspace = await workspaceRepo.findWorkspaceById(workspaceId);
  if (!workspace) {
    throw new AppError('Workspace not found', 404);
  }
  return workspace;
};

export const getUserWorkspaces = async (userId: string) => {
  return workspaceRepo.findWorkspacesByUser(userId);
};

export const createWorkspace = async (userId: string, name: string) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
  
  const workspace = await workspaceRepo.createWorkspace({ name, slug });
  await workspaceRepo.addMember(workspace.id, userId, 'OWNER');
  
  return workspace;
};

export const updateWorkspace = async (workspaceId: string, userId: string, data: { name?: string }) => {
  const workspace = await workspaceRepo.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError('Workspace not found', 404);
  
  let slug = workspace.slug;
  if (data.name) {
    slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
  }
  
  return workspaceRepo.updateWorkspace(workspaceId, { ...data, slug });
};

export const deleteWorkspace = async (workspaceId: string, userId: string) => {
  const workspace = await workspaceRepo.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError('Workspace not found', 404);
  
  return workspaceRepo.deleteWorkspace(workspaceId);
};

export const addMemberToWorkspace = async (
  workspaceId: string,
  userId: string,
  targetUserEmail: string,
  role: WorkspaceRole
) => {
  // Implementation would find user by email and add
  return workspaceRepo.addMember(workspaceId, userId, role);
};

export const updateMemberRoleInWorkspace = async (
  workspaceId: string,
  userId: string,
  targetUserId: string,
  role: WorkspaceRole
) => {
  return workspaceRepo.updateMemberRole(workspaceId, targetUserId, role);
};

export const removeMemberFromWorkspace = async (workspaceId: string, userId: string, targetUserId: string) => {
  return workspaceRepo.removeMember(workspaceId, targetUserId);
};
