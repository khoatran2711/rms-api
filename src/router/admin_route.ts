import express from "express";
import { errorMiddleware } from "../middlewares/err.middleware";
import { initAdmin, login, register } from "../controller/admin/authentication";
import { createRoom, updateRoom, deleteRoom, getRoom, listRoom } from "../controller/admin/room";
import { createProduct, deleteProduct, getProduct, listProduct, updateProduct } from "../controller/admin/products";
import { createRoomType, deleteRoomType, updateRoomType } from "../controller/admin/roomTypes";

const get = (url: string) => {
  return "/admin"+url
}
export default (router: express.Router) => {
  
  // Authentication routes
  router.post(get("/auth/register"),register);
  router.post(get("/auth/login"), login);
  router.post(get("/auth/init"), initAdmin);


  // Room routes
  router.get(get("/room/list"),listRoom);
  router.post(get("/room/create"),createRoom);
  router.post(get("/room/update"),updateRoom);
  router.delete(get("/room/delete"),deleteRoom);
  router.get(get("/room/detail"),getRoom);

  //Products routes
  router.get(get("/product/list"),listProduct);
  router.post(get("/product/create"),createProduct);
  router.post(get("/product/update"),updateProduct);
  router.delete(get("/product/delete"),deleteProduct);
  router.get(get("/product/detail"),getProduct);

  //RoomTypes router
  router.post(get("/roomtype/create"),createRoomType);
  router.post(get("/roomtype/update"),updateRoomType);
  router.delete(get("/roomtype/delete"),deleteRoomType);
};
