import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { createRoomTypes, deleteRoomTypesById, getRoomTypesById, getRoomTypesByName, RoomTypesModel, updateRoomTypesById } from "./../../models/roomTypes";

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

export const deleteRoomType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.query.id;
        const existRoomType = await getRoomTypesById(id as string);
        if(!existRoomType)
        {
            return badRequest("RoomType Not Found!", res, 404);
        }
        const deleteQuery = await deleteRoomTypesById(id as string);
        return success("", res);
    } catch (error) {
        return badRequest("Internal server!", res,500);
    }
}

export const getRoomType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.query.id as string;
        const roomtype = await RoomTypesModel.findById(id);
        if(!roomtype)
        {
            return badRequest("RoomType Not Found!",res,404);
        }
        return success(roomtype,res);
    } catch (error) {
        return badRequest("Internal server!", res,500);
    }
}