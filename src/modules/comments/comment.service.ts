import { AppError } from '../../common/errors/AppError';
import * as commentRepo from './comment.repository';

export const getTaskComments = async (taskId: string, userId: string) => {
  return commentRepo.findCommentsByTask(taskId);
};

export const createComment = async (taskId: string, userId: string, content: string) => {
  if (!content || content.trim().length === 0) {
    throw new AppError('Comment content is required', 400);
  }
  return commentRepo.createComment({ taskId, userId, content });
};

export const updateComment = async (commentId: string, userId: string, content: string) => {
  const comment = await commentRepo.findCommentById(commentId);
  if (!comment) throw new AppError('Comment not found', 404);
  if (comment.userId !== userId) throw new AppError('Unauthorized to edit this comment', 403);
  return commentRepo.updateComment(commentId, content);
};

export const deleteComment = async (commentId: string, userId: string) => {
  const comment = await commentRepo.findCommentById(commentId);
  if (!comment) throw new AppError('Comment not found', 404);
  if (comment.userId !== userId) throw new AppError('Unauthorized to delete this comment', 403);
  return commentRepo.deleteComment(commentId);
};
