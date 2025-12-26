import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHAndler";

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
console.error("error in ", req.originalUrl, " ",err);

res.status(err.statusCode ||500).send(new ResponseHandler(null,err));
}