import { NextFunction, Request, Response } from "express"

export const validateRole = (role: "teacher" | "student") => (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (req.user.role !== role) {
        return res.status(403).json({
            success: false,
            error: `Forbidden, ${role} access required`
        });
    } else {
        next();
    }
};