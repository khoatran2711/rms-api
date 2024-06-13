import express from "express";
import { login, register } from "../controller/authentication";
import { errorMiddleware } from "../middlewares/err.middleware";

export default (router: express.Router) => {
  router.post("/auth/register",register,errorMiddleware);
  router.post("/auth/login", login);
};
