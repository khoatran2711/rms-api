import { updateRoomById } from './../../models/room';
import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addRoom, getRoomById, getRoomByName, RoomModel } from "../../models/room";


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
      status
    };
    const addNewQuery = await addRoom(roomData)
    return success("", res)
} catch (error) {
    return badRequest("Internal server !",res,500)
}
};


export const updateRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, roomTypeID, price, status } = req.body;
    const room = await RoomModel.findByIdAndUpdate(req.params.id, { name, roomTypeID, price, status}, { new: true, runValidators: true});
    if(!room)
    {
      return badRequest("Room Not Found !", res);
    }
    return success("",res);
  }
  catch (error) {
    return badRequest("Internal server !", res,500);
  }
}

export const deleteRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const room = await RoomModel.findByIdAndDelete(req.params.id);
    if(!room)
    {
      return badRequest("Room Not Found !", res);
    }
    return success("",res);
  }
  catch (error) {
    return badRequest("Internal server !", res, 500);
  }
}