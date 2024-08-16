import express from "express";
import { errorMiddleware } from "../middlewares/err.middleware";
import { initAdmin, login, register } from "../controller/admin/authentication";
import { createRoom, updateRoom, deleteRoom, getRoom, listRoom } from "../controller/admin/room";
import { createProduct, deleteProduct, getProduct, listProduct, updateProduct } from "../controller/admin/products";
import { createRoomType, deleteRoomType, getRoomType, listRoomType, updateRoomType } from "../controller/admin/roomTypes";
import { createServiceBooking, deleteServiceBooking, updateServiceBooking } from "../controller/admin/serviceBooking";
import { createRoomBooking, deleteRoomBooking, updateRoomBooking } from "../controller/admin/roomBooking";
import { createService, deleteService, getService, listService, updateService } from "../controller/admin/services";
import { createUser, deleteUser, updateUser } from "../controller/admin/users";

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

  //RoomTypes routes
  router.get(get("/roomType/list"),listRoomType);
  router.post(get("/roomType/create"),createRoomType);
  router.post(get("/roomType/update"),updateRoomType);
  router.delete(get("/roomType/delete"),deleteRoomType);
  router.get(get("/roomType/detail"),getRoomType);

  //ServiceBooking routes
  router.post(get("/serviceBooking/create"), createServiceBooking);
  router.post(get("/serviceBooking/update"),updateServiceBooking);
  router.delete(get("/serviceBooking/delete"), deleteServiceBooking);

  //RoomBooking routes
  router.post(get("/roomBooking/create"), createRoomBooking);
  router.post(get("/roomBooking/update"), updateRoomBooking);
  router.delete(get("/roomBooking/delete"), deleteRoomBooking);

  //Service routes
  router.get(get("/service/list"), listService);
  router.post(get("/service/create"), createService);
  router.post(get("/service/update"), updateService);
  router.delete(get("/service/delete"), deleteService);
  router.get(get("/service/detail"), getService);

  //User routes
  router.post(get("/user/create"), createUser);
  router.post(get("/user/update"), updateUser);
  router.delete(get("/user/delete"), deleteUser);
};
