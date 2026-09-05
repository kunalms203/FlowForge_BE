import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { ensureWorkspaceAccess } from '../../common/middlewares/tenantMiddleware';
import {
  getWorkspaceActivities,
  getProjectActivities,
  getTaskActivities,
} from './activity.controller';

const router = Router();

router.use(authenticate);

router.get('/workspace/:workspaceId', ensureWorkspaceAccess, getWorkspaceActivities);
router.get('/project/:projectId', getProjectActivities);
router.get('/task/:taskId', getTaskActivities);

export default router;
