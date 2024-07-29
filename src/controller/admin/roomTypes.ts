import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { createRoomTypes, getRoomTypesById, getRoomTypesByName, updateRoomTypesById } from "./../../models/roomTypes";

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
            decscription,
        };
        const addNewQuery = await createRoomTypes(roomTypeData);
        return success("",res);
    }
    catch (error)
    {
        return badRequest("Internal server!", res, 500);
    }
}

export const updateRoomType = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id, name, decscription } = req.body;
        const existRoomType = await getRoomTypesById(id as string);
        if(!existRoomType)
        {
            return badRequest("RoomType Not Found!", res, 404)
        }
        const data = {
            id,
            name,
            decscription,
        };
        const roomtype = await updateRoomTypesById(id as string, data);
        return success("", res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}