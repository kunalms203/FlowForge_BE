import bcrypt from "bcrypt";
import { findUserByMail } from "../repository/authRepo";
import { sign } from "jsonwebtoken";
import type { loginReponse } from "../types/authTypes";

const secret = process.env.JWTSECRET;

export const loginWithMail = async (
  email: string,
  password: string,
): Promise<loginReponse> => {
  const user = await findUserByMail(email);

  const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

  if (!isAuthenticated) {
    throw new Error("INCORRECT PASSWORD");
  }

  if (!secret) {
    throw new Error("Please add JWT secret in ENV");
  }

  const token = sign(
    { id: user.id, name: user.fullName, mail: user.email },
    secret,
  );

  return { token, id: Number(user.id), name: user.fullName, mail: user.email };
};
