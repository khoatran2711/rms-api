import { deleteRoombyId, updateRoomById } from "./../../models/room";
import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import {
  addRoom,
  getRoomById,
  getRoomByName,
  RoomModel,
} from "../../models/room";

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
    const existRoom = await getRoomById(id);
    if (!existRoom) {
      return badRequest("Room Not Found !", res,404);
    }
    const data = {
      id,
      name,
      roomTypeID,
      price,
      status,
    };
    const room = await updateRoomById(id, data)
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
    const id = req.params.id
    const existRoom = await getRoomById(id);
    if (!existRoom) {
      return badRequest("Room Not Found !", res,404);
    }
    const deleteQuery = await deleteRoombyId(id);
    
    return success("",res);
  }
  catch (error) {
    return badRequest("Internal server !", res, 500);
  }
}

export const getRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id
    const room = await RoomModel.findById(id);
    if(!room)
    {
      return badRequest("Room Not Found !", res ,404);
    }
    return success(room,res);
  }
  catch (error) {
    return badRequest("Internal server !", res, 500);
  }
}