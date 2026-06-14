import { prisma } from '../../config/prisma';

export const findAttachmentById = async (id: string) => {
  return prisma.attachment.findUnique({ where: { id } });
};

export const createAttachment = async (data: {
  taskId: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: bigint;
  mimeType: string;
}) => {
  return prisma.attachment.create({ data });
};

export const deleteAttachment = async (id: string) => {
  return prisma.attachment.delete({ where: { id } });
};
