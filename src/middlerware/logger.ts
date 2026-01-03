import { NextFunction, Request, Response } from "express";

export const pathLogger = (req: Request, res: Response, next: NextFunction) => {
    // We listen for the 'finish' event, which fires when the response has been sent
    res.on('finish', () => {
        const { method, originalUrl } = req;
        const { statusCode } = res;

        console.info(`${method}: ${originalUrl} ${statusCode}`);
    });

    next();
};