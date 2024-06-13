import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import { error } from "console";
import router from "./router/index";
import morgan from "morgan";
import listEndpoints from 'express-list-endpoints';
import { globalMiddleware } from "./middlewares";
import { env } from "process";
import { errorMiddleware } from "./middlewares/err.middleware";


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

// globalMiddleware(app)
app.use(errorMiddleware)
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = http.createServer(app);

const MonngoUrl = "mongodb://localhost:27017/blankDB";
mongoose.Promise = Promise;
mongoose.connect(MonngoUrl);
mongoose.connection.on("Error", (error: Error) => {
  console.log(error);
});
app.use("/", router());

logRoutes(app) 
server.listen(8080, () => {
});


