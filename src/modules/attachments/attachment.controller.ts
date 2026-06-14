import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import { upload } from '../../common/middlewares/uploadMiddleware';
import * as attachmentService from './attachment.service';

export const uploadAttachment = [
  upload.single('file'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { taskId } = req.params;
    const file = req.file;
    if (!file) throw new Error('No file uploaded');
    const attachment = await attachmentService.uploadAttachment(taskId, req.user!.id, file);
    res.status(201).json({ success: true, message: 'Attachment uploaded', data: attachment });
  }),
];

export const deleteAttachment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { attachmentId } = req.params;
  await attachmentService.deleteAttachment(attachmentId, req.user!.id);
  res.json({ success: true, message: 'Attachment deleted' });
});
