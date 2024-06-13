import express from "express";
import { badRequest } from "../helpers/res.helper";
import { Error } from 'mongoose';


export const errorMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("fact")
    if (err instanceof Error.ValidationError) {
        console.log(err.errors)
        return badRequest('Validation Error',res)
    }
    badRequest("Interal server",res,505)
};
// export const errorMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
