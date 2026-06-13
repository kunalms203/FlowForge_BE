import { type Request, type Response } from "express";
import bcrypt from "bcrypt"

const login = (req: Request, res: Response) => {
  const { email, password, fullname } = req.body;

  
};
