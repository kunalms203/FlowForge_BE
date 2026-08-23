import bcrypt from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../common/errors/AppError';
import { generateAccessToken, generateRefreshToken } from '../../common/utils/generateTokens';
import * as authRepo from './auth.repository';
import crypto from 'crypto';

export const register = async (data: {
  email: string;
  password: string;
  fullName: string;
  workspaceName: string;
}) => {
  const existingUser = await authRepo.findUserByEmail(data.email);
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }

  const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);

  const user = await authRepo.createUser({
    email: data.email,
    passwordHash,
    fullName: data.fullName,
  });

  const workspace = await authRepo.createWorkspaceForUser(user.id, data.workspaceName);

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  });
  const refreshToken = generateRefreshToken(user.id);

  const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await authRepo.createSession({
    userId: user.id,
    refreshTokenHash,
    expiresAt,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
    },
    accessToken,
    refreshToken,
  };
};

export const login = async (
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  });
  const refreshToken = generateRefreshToken(user.id);

  const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await authRepo.createSession({
    userId: user.id,
    refreshTokenHash,
    ipAddress,
    userAgent,
    expiresAt,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = verify(refreshToken, env.REFRESH_SECRET) as { id: string };
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await authRepo.findSessionByRefreshToken(refreshTokenHash);
    if (!session || session.expiresAt < new Date()) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    const user = await authRepo.findUserByEmail(decoded.id);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });

    return { accessToken: newAccessToken };
  } catch {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logout = async (refreshToken: string) => {
  const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const session = await authRepo.findSessionByRefreshToken(refreshTokenHash);
  if (session) {
    await authRepo.deleteSession(session.id);
  }
};
