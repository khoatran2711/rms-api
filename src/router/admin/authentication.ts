import express from "express";
import { login, register } from "../../controller/authentication";
import { errorMiddleware } from "../../middlewares/err.middleware";

const adminEndPoint = (url: string) => {
  return "admin"+url
}
export default (router: express.Router) => {
  router.post(adminEndPoint("/auth/register"),register,errorMiddleware);
  router.post(adminEndPoint("/auth/login"), login);
};
