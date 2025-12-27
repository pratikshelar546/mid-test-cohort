import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { AUTH_RESPONSE } from "../module/auth/auth.response";

export const tokenValidator =(req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
console.log(authorization);

        const token = authorization?.split(" ")[1];
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
        next();

    } catch (error) {
       throw error
    }
}
