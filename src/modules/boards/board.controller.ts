import { Response } from 'express';
import { AuthRequest } from '../../common/middlewares/authMiddleware';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as boardService from './board.service';

export const getBoards = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const boards = await boardService.getProjectBoards(projectId, req.user!.id);
  res.json({ success: true, data: boards });
});

export const getBoard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  const board = await boardService.getBoardById(boardId, req.user!.id);
  res.json({ success: true, data: board });
});

export const createBoard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const board = await boardService.createBoard(projectId, req.user!.id, req.body);
  res.status(201).json({ success: true, message: 'Board created', data: board });
});

export const updateBoard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  const board = await boardService.updateBoard(boardId, req.user!.id, req.body);
  res.json({ success: true, message: 'Board updated', data: board });
});

export const deleteBoard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  await boardService.deleteBoard(boardId, req.user!.id);
  res.json({ success: true, message: 'Board deleted' });
});
