import { prisma } from '../../config/prisma';

export const findBoardById = async (id: string) => {
  return prisma.board.findUnique({
    where: { id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } },
  });
};

export const findBoardsByProject = async (projectId: string) => {
  return prisma.board.findMany({
    where: { projectId },
    orderBy: { position: 'asc' },
    include: { tasks: true },
  });
};

export const createBoard = async (data: { projectId: string; name: string; position: number }) => {
  return prisma.board.create({ data });
};

export const updateBoard = async (id: string, data: { name?: string; position?: number }) => {
  return prisma.board.update({ where: { id }, data });
};

export const deleteBoard = async (id: string) => {
  return prisma.board.delete({ where: { id } });
};

export const getMaxPosition = async (projectId: string) => {
  const maxBoard = await prisma.board.findFirst({
    where: { projectId },
    orderBy: { position: 'desc' },
  });
  return maxBoard ? maxBoard.position + 1 : 0;
};
