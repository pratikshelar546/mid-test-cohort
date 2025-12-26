import { NextFunction, Request, Response } from "express";

export const pathLogger= (req:Request,res:Response,next:NextFunction)=>{
    console.info(`${req.method}: ${req.originalUrl}`)
    next();
}