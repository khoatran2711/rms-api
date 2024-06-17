import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router/index";
import morgan from "morgan";
import listEndpoints from 'express-list-endpoints';
import { errorMiddleware } from "./middlewares/err.middleware";
import { connectDB } from "./db/connection.db";
import dotenv from 'dotenv';
dotenv.config()

const logRoutes = (app: express.Application) =>{
  const endpoints = listEndpoints(app);
  console.log('Available routes:');
  endpoints.forEach(endpoint => {
    endpoint.methods.forEach(method => {
      console.log(`${method} ${endpoint.path}`);
    });
  });
}
const corsOptions = {
  origin: "*",
  credential: true,
};
const app = express();
app.use(morgan("dev"));
connectDB()
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// globalMiddleware(app)
app.use(cors(corsOptions));
app.use(errorMiddleware)
app.use("/api/v1", router());

const server = http.createServer(app);
server.listen(8080, () => {
  logRoutes(app) 
});


