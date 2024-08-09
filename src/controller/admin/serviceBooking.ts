import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addServiceBooking, getServiceBookingByProduct } from "./../../models/serviceBooking";

export const createServiceBooking = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { products, totalAmount, customerName, customerPhoneNumber, userID } = req.body;
        const existServiceBooking = await getServiceBookingByProduct(products);
        if(existServiceBooking) {
            return badRequest("Existing serviceBooking!", res);
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