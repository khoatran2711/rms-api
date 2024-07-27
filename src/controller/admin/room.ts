import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addRoom, getRoomById, getRoomByName } from "../../models/room";


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
    return badRequest("Interal server !",res,500)
}
};
