import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as commentService from './comment.service';

export const getComments = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const comments = await commentService.getTaskComments(taskId, req.user!.id);
  res.json({ success: true, data: comments });
});

export const createComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params;
  const { content } = req.body;
  const comment = await commentService.createComment(taskId, req.user!.id, content);
  res.status(201).json({ success: true, message: 'Comment added', data: comment });
});

export const updateComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await commentService.updateComment(commentId, req.user!.id, content);
  res.json({ success: true, message: 'Comment updated', data: comment });
});

export const deleteComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { commentId } = req.params;
  await commentService.deleteComment(commentId, req.user!.id);
  res.json({ success: true, message: 'Comment deleted' });
});
