import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { createRoomTypes, getRoomTypesById, getRoomTypesByName } from "./../../models/roomTypes";

export const createRoomType = async(
    req: express.Request,
    res: express.Response
) => {
    try
    {
        const { name, decscription } = req.body;
        const existRoomType = await getRoomTypesByName(name);
        if(existRoomType) 
        {
            return badRequest("Existing roomType!",res);
        }
        const roomTypeData = {
            name,
            decscription
        };
        const addNewQuery = await createRoomTypes(roomTypeData);
        return success("",res);
    }
    catch (error)
    {
        return badRequest("Internal server!", res, 500);
    }
}