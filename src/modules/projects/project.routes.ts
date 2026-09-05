import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { ensureWorkspaceAccess } from '../../common/middlewares/tenantMiddleware';
import { requireWorkspaceRole } from '../../common/middlewares/rbacMiddleware';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from './project.controller';

const router = Router({ mergeParams: true });
router.use(authenticate);
router.use(ensureWorkspaceAccess);

router.get('/', getProjects);
router.post('/', requireWorkspaceRole(['OWNER', 'ADMIN', 'MANAGER']), createProject);
router.get('/:projectId', getProject);
router.put('/:projectId', requireWorkspaceRole(['OWNER', 'ADMIN', 'MANAGER']), updateProject);
router.delete('/:projectId', requireWorkspaceRole(['OWNER', 'ADMIN']), deleteProject);

export default router;
