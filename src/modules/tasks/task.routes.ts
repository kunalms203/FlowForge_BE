import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { ensureWorkspaceAccess } from '../../common/middlewares/tenantMiddleware';
import { getTasks, getTask, createTask, updateTask, deleteTask, moveTask } from './task.controller';

const router = Router({ mergeParams: true });
router.use(authenticate);
router.use(ensureWorkspaceAccess);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:taskId', getTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
router.post('/:taskId/move', moveTask);

export default router;
