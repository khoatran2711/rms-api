import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addRoomBooking, getRoomBookingByPhoneNumber } from "./../../models/roomBooking";

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