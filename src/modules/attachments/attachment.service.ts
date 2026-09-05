import fs from 'fs/promises';
import path from 'path';
import { AppError } from '../../common/errors/AppError';
import * as attachmentRepo from './attachment.repository';
import { env } from '../../config/env';

export const uploadAttachment = async (
  taskId: string,
  userId: string,
  file: Express.Multer.File
) => {
  if (!file) throw new AppError('No file uploaded', 400);

  const fileUrl = `/uploads/${file.filename}`;
  const attachment = await attachmentRepo.createAttachment({
    taskId,
    userId,
    fileName: file.originalname,
    fileUrl,
    fileSize: BigInt(file.size),
    mimeType: file.mimetype,
  });
  return attachment;
};

export const deleteAttachment = async (attachmentId: string, userId: string) => {
  const attachment = await attachmentRepo.findAttachmentById(attachmentId);
  if (!attachment) throw new AppError('Attachment not found', 404);
  if (attachment.userId !== userId)
    throw new AppError('Unauthorized to delete this attachment', 403);

  // Delete file from disk
  const filePath = path.join(env.UPLOAD_DIR, path.basename(attachment.fileUrl));
  await fs.unlink(filePath).catch(() => {});

  return attachmentRepo.deleteAttachment(attachmentId);
};
