import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { prisma } from '../../config/prisma';
import { AppError } from '../errors/AppError';
import { WorkspaceRole } from '../../../generated/prisma/client';

export const requireWorkspaceRole = (roles: WorkspaceRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const workspaceId = req.params.workspaceId || req.body.workspaceId;
      if (!workspaceId) {
        throw new AppError('Workspace ID required', 400);
      }

      const membership = await prisma.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId: req.user!.id,
        },
      });

      if (!membership || !roles.includes(membership.role)) {
        throw new AppError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
