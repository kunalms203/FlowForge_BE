import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { getComments, createComment, updateComment, deleteComment } from './comment.controller';

const router = Router({ mergeParams: true });
router.use(authenticate);

router.get('/', getComments);
router.post('/', createComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

export default router;
