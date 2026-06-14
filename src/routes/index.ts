import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import workspaceRoutes from '../modules/workspaces/workspace.routes';
import projectRoutes from '../modules/projects/project.routes';
import boardRoutes from '../modules/boards/board.routes';
import taskRoutes from '../modules/tasks/task.routes';
import commentRoutes from '../modules/comments/comment.routes';
import attachmentRoutes from '../modules/attachments/attachment.routes';
import notificationRoutes from '../modules/notifications/notification.routes';
import activityRoutes from '../modules/activity/activity.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/workspaces/:workspaceId/projects', projectRoutes);
router.use('/workspaces/:workspaceId/projects/:projectId/boards', boardRoutes);
router.use('/workspaces/:workspaceId/projects/:projectId/boards/:boardId/tasks', taskRoutes);
router.use('/tasks/:taskId/comments', commentRoutes);
router.use('/tasks/:taskId/attachments', attachmentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/activities', activityRoutes);

export default router;
