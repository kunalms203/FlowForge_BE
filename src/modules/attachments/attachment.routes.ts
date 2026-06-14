import { Router } from 'express';
import { authenticate } from '../../common/middlewares/authMiddleware';
import { uploadAttachment, deleteAttachment } from './attachment.controller';

const router = Router({ mergeParams: true });
router.use(authenticate);

router.post('/upload', uploadAttachment);
router.delete('/:attachmentId', deleteAttachment);

export default router;
