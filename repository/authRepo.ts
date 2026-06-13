import type { User } from "../generated/prisma/client";
import { prisma } from "../utils/db";

export const findUserByMail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("NOT_FOUND");
  }

  return user;
};
