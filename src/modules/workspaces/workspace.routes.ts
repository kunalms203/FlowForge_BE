import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { getWorkspaces, getWorkspace, createWorkspace, updateWorkspace, deleteWorkspace } from './workspace.controller';
import { ensureWorkspaceAccess } from '../../common/middlewares/tenantMiddleware';
import { requireWorkspaceRole } from '../../common/middlewares/rbacMiddleware';

const router = Router();
router.use(authenticate);

router.get('/', getWorkspaces);
router.post('/', createWorkspace);
router.get('/:workspaceId', ensureWorkspaceAccess, getWorkspace);
router.put('/:workspaceId', ensureWorkspaceAccess, requireWorkspaceRole(['OWNER', 'ADMIN']), updateWorkspace);
router.delete('/:workspaceId', ensureWorkspaceAccess, requireWorkspaceRole(['OWNER']), deleteWorkspace);

export default router;
