import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addRoomBooking, getRoomBookingById, getRoomBookingByPhoneNumber, updateRoomBookingById } from "./../../models/roomBooking";

export const createRoomBooking = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const { customerName, identityNumber, phoneNumber, roomID, userID, members, checkInDate, checkOutDate } = req.body;
        const existRoomBooking = await getRoomBookingByPhoneNumber(phoneNumber);
        if(existRoomBooking)
        {
            return badRequest("Existing roomBooking!", res);
        }
        const roomBookingData = {
            customerName,
            identityNumber,
            phoneNumber,
            roomID,
            userID,
            members,
            checkInDate,
            checkOutDate,
        };
        const addNewQuery = await addRoomBooking(roomBookingData);
        return success("", res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}

export const updateRoomBooking = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id, customerName, identityNumber, phoneNumber, roomID, userID, checkInDate, checkOutDate } = req.body;
        const existRoomBooking = await getRoomBookingById(id as string);
        if(!existRoomBooking)
        {
            return badRequest("roomBooking Not Found!", res, 404);
        }
        const data = {
            id,
            customerName,
            identityNumber,
            phoneNumber,
            roomID,
            userID,
            checkInDate,
            checkOutDate
        };
        const roomBooking = await updateRoomBookingById(id as string, data);
        return success("", res);
    } catch (error) {
        return badRequest("Internal server!",res,500);
    }
}