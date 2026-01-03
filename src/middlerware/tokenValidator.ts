import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const tokenValidator =(req: Request, res: Response, next: NextFunction) => {
    
    const { authorization } = req.headers;
    const token = authorization?.includes(" ") 
    ? authorization.split(" ")[1] 
    : authorization;
    try {
        if (!token) {
            // throw AUTH_RESPONSE.USER_NOT_FOUND
             return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invalid"
        })
        };

        const payload = jwt.verify(token, "testing") as { id: string, role: "teacher" | "student" };
        req.user = {
            id: payload.id,
            role: payload.role
            };
            console.log(req.user);
            
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invalid"
        })
    }
}
