import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { loginWithMail } from "../services/authServices";
import type { ErrorResponse, SuccessResponse } from "../types/apiResponse";
import type { loginReponse } from "../types/authTypes";

export const login = async (
  req: Request,
  res: Response<SuccessResponse<loginReponse> | ErrorResponse>,
) => {
  try {

    const { email, password } = req.body;
    const data = await loginWithMail(email, password);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: data,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
