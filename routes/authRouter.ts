import express, { Router, type Request,type Response } from "express";
const router = express.Router();

router.get("/login",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"logged in successfully"
    })
});

export default router;