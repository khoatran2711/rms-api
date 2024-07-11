import express from "express";
import { initAdmin, login, register } from "../controller/authentication";
import { errorMiddleware } from "../middlewares/err.middleware";

const get = (url: string) => {
  return "/admin"+url
}
export default (router: express.Router) => {
  
  // Authentication routes
  router.post(get("/auth/register"),register);
  router.post(get("/auth/login"), login);
  router.post(get("/auth/init"), initAdmin);

  
};
