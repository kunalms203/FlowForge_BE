import { Request, Response } from 'express';
import { asyncHandler } from '../../common/middlewares/asyncHandler';
import * as authService from './auth.service';
import { AppError } from '../../common/errors/AppError';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'];

  const result = await authService.login(email, password, ipAddress, userAgent);
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  const result = await authService.refreshAccessToken(refreshToken);
  res.status(200).json({
    success: true,
    message: 'Token refreshed',
    data: result,
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await authService.logout(refreshToken);
  }
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
