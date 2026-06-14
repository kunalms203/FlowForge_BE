import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { prisma } from '../../config/prisma';
import { AppError } from '../errors/AppError';

export const ensureWorkspaceAccess = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = req.params.workspaceId || req.body.workspaceId;
    if (!workspaceId) {
      return next();
    }

    const membership = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: req.user!.id,
      },
    });

    if (!membership) {
      throw new AppError('Access denied to this workspace', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
