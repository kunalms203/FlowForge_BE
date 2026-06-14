import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { ensureWorkspaceAccess } from '../../common/middlewares/tenantMiddleware';
import { getBoards, getBoard, createBoard, updateBoard, deleteBoard } from './board.controller';

const router = Router({ mergeParams: true });
router.use(authenticate);
router.use(ensureWorkspaceAccess);

router.get('/', getBoards);
router.post('/', createBoard);
router.get('/:boardId', getBoard);
router.put('/:boardId', updateBoard);
router.delete('/:boardId', deleteBoard);

export default router;
