import { prisma } from '../../config/prisma';
import type { User } from '../../generated/prisma/client';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  email: string;
  passwordHash: string;
  fullName: string;
}): Promise<User> => {
  return prisma.user.create({
    data,
  });
};

export const createWorkspaceForUser = async (userId: string, workspaceName: string) => {
  const slug = workspaceName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
  
  return prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: workspaceName,
        slug,
      },
    });

    // ✅ Use camelCase: workspaceMember (not WorkspaceMember)
    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId,
        role: 'OWNER',
      },
    });

    return workspace;
  });
};

export const createSession = async (data: {
  userId: string;
  refreshTokenHash: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
}) => {
  return prisma.userSession.create({ data });
};

export const findSessionByRefreshToken = async (refreshTokenHash: string) => {
  return prisma.userSession.findFirst({
    where: { refreshTokenHash },
  });
};

export const deleteSession = async (sessionId: string) => {
  return prisma.userSession.delete({ where: { id: sessionId } });
};