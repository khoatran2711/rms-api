import express from "express";
import { errorMiddleware } from "./err.middleware";


export const globalMiddleware = (app: any) =>{
    app.use(errorMiddleware)
} 