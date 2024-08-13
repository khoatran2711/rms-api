import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addService, deleteServiceById, getServiceById, getServicesByName, updateServiceById } from "./../../models/service";

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
};

export const updateService = async(
    req: express.Request,
    res: express.Response
) => { 
    try {
        const { id, name, decscription, productsID } = req.body;
        const existService = await getServiceById(id as string);
        if(!existService)
        {
            return badRequest("Service Not Found!", res, 404);
        }
        const data = {
            id,
            name,
            decscription,
            productsID
        };
        const service = await updateServiceById(id as string, data);
        return success("", res);

    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
};

export const deleteService = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.query.id;
        const existService = await getServiceById(id as string);
        if(!existService)
        {
            return badRequest("Service Not Found!", res, 404);
        }
        const deleteQuery = await deleteServiceById(id as string);
        return success("",res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}