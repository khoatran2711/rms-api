import express from "express";
import { errorMiddleware } from "../middlewares/err.middleware";
import { initAdmin, login, register } from "../controller/admin/authentication";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  listRoom,
  listAvailableRoom,
} from "../controller/admin/room";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProduct,
  updateProduct,
} from "../controller/admin/products";
import {
  createRoomType,
  deleteRoomType,
  getRoomType,
  listRoomType,
  updateRoomType,
} from "../controller/admin/roomTypes";
import {
  createServiceBooking,
  deleteServiceBooking,
  updateServiceBooking,
} from "../controller/admin/serviceBooking";
import {
  createRoomBooking,
  deleteRoomBooking,
  updateRoomBooking,
} from "../controller/admin/roomBooking";
import {
  createService,
  deleteService,
  getService,
  listService,
  updateService,
} from "../controller/admin/services";
import {
  createUser,
  deleteUser,
  updateUser,
  getUserWithId,
  listUser,
  getInfomation,
} from "../controller/admin/users";
import {
  AllOrders,
  getOrder,
  newOrder,
  updateStatusOrder,
} from "../controller/admin/order";
import {
  listRole,
  createNewRole,
  updateRole,
  getRole,
  deleteRole,
  getRolePermission,
} from "../controller/admin/role";
import { getOverviewData, getSalesReport } from "../controller/admin/report";
import { authMiddleware } from "../middlewares/auth.middleware";

const get = (url: string) => {
  return "/admin" + url;
};
export default (router: express.Router) => {
  // Authentication routes
  router.post(get("/auth/register"),  register);
  router.post(get("/auth/login"), login);
  router.post(get("/auth/init"), initAdmin);


  router.get(get("/user/info"), authMiddleware, getInfomation)
  // Room routes
  router.get(get("/room/list"), authMiddleware, listRoom);
  router.post(get("/room/create"), authMiddleware, createRoom);
  router.post(get("/room/update"), authMiddleware, updateRoom);
  router.delete(get("/room/delete"), authMiddleware, deleteRoom);
  router.get(get("/room/detail"), authMiddleware, getRoom);
  router.get(get("/room/available"), authMiddleware, listAvailableRoom);

  //Roles routes
  router.get(get("/role/list"), authMiddleware, listRole);
  router.post(get("/role/create"), authMiddleware, createNewRole);
  router.post(get("/role/update"), authMiddleware, updateRole);
  router.delete(get("/role/delete"), authMiddleware, deleteRole);
  router.get(get("/role/detail"), authMiddleware, getRole);
  router.get(get("/role/permisson"), authMiddleware, getRolePermission);
  //Products routes
  router.get(get("/product/list"), authMiddleware, listProduct);
  router.post(get("/product/create"), authMiddleware, createProduct);
  router.post(get("/product/update"), authMiddleware, updateProduct);
  router.delete(get("/product/delete"), authMiddleware, deleteProduct);
  router.get(get("/product/detail"), authMiddleware, getProduct);

  //RoomTypes routes
  router.get(get("/roomType/list"), authMiddleware, listRoomType);
  router.post(get("/roomType/create"), authMiddleware, createRoomType);
  router.post(get("/roomType/update"), authMiddleware, updateRoomType);
  router.delete(get("/roomType/delete"), authMiddleware, deleteRoomType);
  router.get(get("/roomType/detail"), authMiddleware, getRoomType);

  //ServiceBooking routes
  router.post(
    get("/serviceBooking/create"),
    authMiddleware,
    createServiceBooking
  );
  router.post(
    get("/serviceBooking/update"),
    authMiddleware,
    updateServiceBooking
  );
  router.delete(
    get("/serviceBooking/delete"),
    authMiddleware,
    deleteServiceBooking
  );


  //RoomBooking routes
  router.post(get("/roomBooking/create"), authMiddleware, createRoomBooking);
  router.post(get("/roomBooking/update"), authMiddleware, updateRoomBooking);
  router.delete(get("/roomBooking/delete"), authMiddleware, deleteRoomBooking);

  //Service routes
  router.get(get("/service/list"), authMiddleware, listService);
  router.post(get("/service/create"), authMiddleware, createService);
  router.post(get("/service/update"), authMiddleware, updateService);
  router.delete(get("/service/delete"), authMiddleware, deleteService);
  router.get(get("/service/detail"), authMiddleware, getService);

  //User routes
  router.get(get("/employee/list"), authMiddleware, listUser);
  router.post(get("/employee/create"), authMiddleware, createUser);
  router.post(get("/employee/update"), authMiddleware, updateUser);
  router.delete(get("/employee/delete"), authMiddleware, deleteUser);
  router.get(get("/employee/detail"), authMiddleware, getUserWithId);

  // Order routes
  router.get(get("/order/list"), authMiddleware, AllOrders);
  router.post(get("/order/create"), authMiddleware, newOrder);
  router.post(get("/order/update-status"), authMiddleware, updateStatusOrder);
  // router.delete(get("/order/delete"), deleteOrder);
  router.get(get("/order/detail"), authMiddleware, getOrder);

  //Report routes
  router.get(get("/report/overview"), authMiddleware, getOverviewData);
  router.get(get("/report/sale-report"), authMiddleware, getSalesReport);
  
};
