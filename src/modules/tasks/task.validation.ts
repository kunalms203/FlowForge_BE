import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    storyPoints: z.number().int().min(0).max(21).optional(),
    assigneeId: z.string().uuid().optional(),
    startDate: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    storyPoints: z.number().int().min(0).max(21).optional(),
    assigneeId: z.string().uuid().optional(),
    startDate: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
  }),
});

export const moveTaskSchema = z.object({
  body: z.object({
    newBoardId: z.string().uuid(),
  }),
});
