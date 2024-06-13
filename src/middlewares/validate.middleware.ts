// import express from "express";
// import { badRequest } from "helpers/res.helper";
// import jwt from "jsonwebtoken";
// import { env } from "process";
// import { Error } from 'mongoose';
// export const errorMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     if (err instanceof Error.ValidationError) {
//         // const errors: { [key: string]: string } = {};
//         // Object.keys(err.errors).forEach((key) => {
//         //     errors[key] = err.errors[key].message;
//         // });
//         console.log(err.errors)
//         return badRequest('Validation Error',res)
//     }
//     badRequest("Internal Server Error",res,500)
// };