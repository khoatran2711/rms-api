import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addServiceBooking, getServiceBookingById, getServiceBookingByProduct, updateServiceBookingById } from "./../../models/serviceBooking";

export const createServiceBooking = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { products, totalAmount, customerName, customerPhoneNumber, userID } = req.body;
        const existServiceBooking = await getServiceBookingByProduct(products);
        if(existServiceBooking) {
            return badRequest("Existing Service Booking!", res);
        }
        const serviceBookingData = {
            products,
            totalAmount,
            customerName,
            customerPhoneNumber,
            userID,
        };

        const addNewQuery = await addServiceBooking(serviceBookingData);
        return success("", res);
    }
    catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}

export const updateServiceBooking = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id, products, totalAmount, customerName, customerPhoneNumber, userID } = req.body;
        const existServiceBooking = await getServiceBookingById(id as string);
        if(!existServiceBooking)
        {
            return badRequest("Service Booking Not Found!", res, 404);
        }
        const data = {
            id,
            products,
            totalAmount,
            customerName,
            customerPhoneNumber,
            userID,
        }
        const serviceBooking = await updateServiceBookingById(id as string, data);
        return res.send(serviceBooking);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}