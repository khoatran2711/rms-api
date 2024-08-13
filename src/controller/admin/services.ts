import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addService, getServicesByName } from "./../../models/service";

export const createService = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, decscription, productsID } = req.body;
        const existService = await getServicesByName(name);
        if(existService)
        {
            return badRequest("Exist Service!", res);
        }
        const serviceData = {
            name,
            decscription,
            productsID
        };
        const addNewQuery = await addService(serviceData);
        return success("", res);

    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}