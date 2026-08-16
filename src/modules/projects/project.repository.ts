import { prisma } from '../../config/prisma';
import { Project } from '@prisma/client';

export const findProjectById = async (id: string) => {
  return prisma.project.findFirst({
    where: { id, deletedAt: null },
    include: {
      workspace: true,
      boards: { orderBy: { position: 'asc' } },
      members: { include: { user: { select: { id: true, email: true, fullName: true } } } },
    },
  });
};

export const findProjectsByWorkspace = async (workspaceId: string) => {
  return prisma.project.findMany({
    where: { workspaceId, deletedAt: null },
    include: {
      boards: true,
      members: { include: { user: { select: { id: true, email: true, fullName: true } } } },
    },
  });
};

export const createProject = async (data: { workspaceId: string; name: string; description?: string }) => {
  return prisma.project.create({ data });
};

export const updateProject = async (id: string, data: { name?: string; description?: string }) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = async (id: string) => {
  return prisma.project.update({ where: { id }, data: { deletedAt: new Date() } });
};

export const addProjectMember = async (projectId: string, userId: string) => {
  return prisma.projectMember.create({ data: { projectId, userId } });
};

export const removeProjectMember = async (projectId: string, userId: string) => {
  return prisma.projectMember.delete({ where: { projectId_userId: { projectId, userId } } });
};
