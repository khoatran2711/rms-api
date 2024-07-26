import express from "express";
import { errorMiddleware } from "../middlewares/err.middleware";
import { initAdmin, login, register } from "../controller/admin/authentication";
import { createRoom } from "../controller/admin/room";

const get = (url: string) => {
  return "/admin"+url
}
export default (router: express.Router) => {
  
  // Authentication routes
  router.post(get("/auth/register"),register);
  router.post(get("/auth/login"), login);
  router.post(get("/auth/init"), initAdmin);


  // Room route
  router.post(get("/room/create"),createRoom)
};
