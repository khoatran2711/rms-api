import {
  deleteRoombyId,
  getRoomWithQuery,
  updateRoomById,
} from "./../../models/room";
import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import {
  addRoom,
  getRoomByID,
  getRoomByName,
  RoomModel,
} from "../../models/room";
import { listOrders } from "../../models/order";
import mongoose from "mongoose";

export const listRoom = async (req: express.Request, res: express.Response) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let name = req.query.name || null;
    let status = req.query.status || null;
    let roomTypeID = req.query.roomTypeID || null;

    let searchData = <any>{};
    if (name) {
      searchData["name"] = name;
    }
    if (status) {
      searchData["status"] = status;
    }
    if (roomTypeID) {
      searchData["roomTypeID"] = roomTypeID;
    }

    const queryData = {
      data: searchData || null,
      option: {
        populate: "roomTypeID",
        page: page,
        limit: limit,
        sort: { field: "desc", created_at: -1 },
      },
    };

    const roomData = await getRoomWithQuery(queryData);
    const { docs, ...pageData } = roomData;
    let data = <any>{};
    data["data"] = docs;
    data["pageData"] = pageData;

    success(data, res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const createRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, roomTypeID, price, status } = req.body;
    const existRoom = await getRoomByName(name);
    if (existRoom) {
      return badRequest("Existing room !", res);
    }
    const roomData = {
      name,
      roomTypeID,
      price,
      status,
      checkInDate: 0,
      checkOutDate: 0,
    };
    const addNewQuery = await addRoom(roomData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const updateRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, name, roomTypeID, price, status } = req.body;
    const existRoom = await getRoomByID(id as string);
    if (!existRoom) {
      return badRequest("Room Not Found !", res, 404);
    }
    const data = {
      id,
      name,
      roomTypeID,
      price,
      status,
    };
    const room = await updateRoomById(id as string, data);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const deleteRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id;
    const existRoom = await getRoomByID(id as string);
    if (!existRoom) {
      return badRequest("Room Not Found !", res, 404);
    }
    const deleteQuery = await deleteRoombyId(id as string);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const getRoom = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id as string;
    const room = await RoomModel.findById(id);
    if (!room) {
      return badRequest("Room Not Found !", res, 404);
    }
    return success([room], res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};
export const listAvailableRoom = async (
  req: express.Request,
  res: express.Response
) => {
  const { start, end } = req.query;
  const queryData = {
    orderType: "booking",
    status: {
      $nin: ["Canceled", "CheckedOut"], 
    },
    $or: [{ checkOutDate: { $gte: start } }, { checkInDate: { $lte: end } }],
  };
  const listOrderFromStartToEnd = await listOrders(queryData);

  const listRooms = listOrderFromStartToEnd.map((order) => order.rooms);
  const unavailableRoomIds = listRooms
    .flat()
    .filter(item => item && item.room && item.room.id)
    .map(item => item.room.id);

  const availableRooms = await RoomModel.find({
    _id: { $nin: unavailableRoomIds },
    status: "Available",
  }).populate("roomTypeID");
  return success(availableRooms, res);
};
