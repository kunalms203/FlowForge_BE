import express, { application } from "express";
import authRouter from "./authRouter"
const router = express.Router();

router.use("/auth",authRouter);

export default router;