import express from "express";
import { badRequest } from "helpers/res.helper";
import jwt from "jsonwebtoken";
import { env } from "process";

export const authMiddleware = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return badRequest("Access forbidden",res,403);
    }
    try {
        const decoded = jwt.verify(token, env.SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (error) {
         badRequest("Invalid token",res)
    }
};