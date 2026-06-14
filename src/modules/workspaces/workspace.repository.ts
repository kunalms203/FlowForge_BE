import { prisma } from '../../config/prisma';
import { WorkspaceRole } from '../../generated/prisma/client';

export const findWorkspaceById = async (id: string) => {
  return prisma.workspace.findUnique({
    where: { id, deletedAt: null },
    include: {
      members: {
        include: { user: { select: { id: true, email: true, fullName: true } } },
      },
      projects: { where: { deletedAt: null } },
    },
  });
};

export const findWorkspacesByUser = async (userId: string) => {
  return prisma.workspace.findMany({
    where: {
      members: { some: { userId } },
      deletedAt: null,
    },
    include: {
      members: {
        where: { userId },
        select: { role: true },
      },
    },
  });
};

export const createWorkspace = async (data: { name: string; slug: string }) => {
  return prisma.workspace.create({ data });
};

export const updateWorkspace = async (id: string, data: { name?: string; slug?: string }) => {
  return prisma.workspace.update({
    where: { id },
    data,
  });
};

export const deleteWorkspace = async (id: string) => {
  return prisma.workspace.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const addMember = async (workspaceId: string, userId: string, role: WorkspaceRole) => {
  return prisma.workspaceMember.create({
    data: { workspaceId, userId, role },
    include: { user: { select: { id: true, email: true, fullName: true } } },
  });
};

export const updateMemberRole = async (workspaceId: string, userId: string, role: WorkspaceRole) => {
  return prisma.workspaceMember.update({
    where: { workspaceId_userId: { workspaceId, userId } },
    data: { role },
  });
};

export const removeMember = async (workspaceId: string, userId: string) => {
  return prisma.workspaceMember.delete({
    where: { workspaceId_userId: { workspaceId, userId } },
  });
};
