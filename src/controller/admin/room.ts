import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addRoom, getRoomById, getRoomByName, RoomModel } from "../../models/room";


export const createRoom = async (
  res: express.Response,
  req: express.Request
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
      const addNewQuery = await addRoom(roomData);
      return success("", res);
  } catch (error) {
    badRequest("Internal server !",res);
  }
};

export const updateRoom = async (
  res: express.Response,
  req: express.Request
) => {
  try{
    const { name, roomTypeID, price, status } = req.body;
    const room = await RoomModel.findOneAndUpdate(req.params.id, { name, roomTypeID, price, status }, { new: true, runValidator: true });
    if(!room)
    {
      return res.status(404).send({ message: "Room not found"});
    }
    return res.send(room);

  }
  catch (error) {
    badRequest("Internal sever !", res)
  }
};