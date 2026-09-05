import { AppError } from '../../common/errors/AppError';
import * as boardRepo from './board.repository';

export const getBoardById = async (boardId: string) => {
  const board = await boardRepo.findBoardById(boardId);
  if (!board) throw new AppError('Board not found', 404);
  return board;
};

export const getProjectBoards = async (projectId: string) => {
  return boardRepo.findBoardsByProject(projectId);
};

export const createBoard = async (projectId: string, userId: string, data: { name: string }) => {
  const position = await boardRepo.getMaxPosition(projectId);
  return boardRepo.createBoard({ projectId, name: data.name, position });
};

export const updateBoard = async (
  boardId: string,
  userId: string,
  data: { name?: string; position?: number }
) => {
  const board = await boardRepo.findBoardById(boardId);
  if (!board) throw new AppError('Board not found', 404);
  return boardRepo.updateBoard(boardId, data);
};

export const deleteBoard = async (boardId: string) => {
  const board = await boardRepo.findBoardById(boardId);
  if (!board) throw new AppError('Board not found', 404);
  return boardRepo.deleteBoard(boardId);
};
