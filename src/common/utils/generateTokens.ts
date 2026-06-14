import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';

export const generateAccessToken = (user: { id: string; email: string; fullName: string }) => {
  return sign(
    { id: user.id, email: user.email, fullName: user.fullName },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY }
  );
};

export const generateRefreshToken = (userId: string) => {
  return sign({ id: userId }, env.REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRY });
};
