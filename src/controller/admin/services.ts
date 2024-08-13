import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addService, deleteServiceById, getServiceById, getServicesByName, getServiceWithQuery, ServiceModel, updateServiceById } from "./../../models/service";
import { ProductScheme } from "models/product";

export const listService = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        let page = Number(req.query.page);
        let limit = Number(req.query.page);
        let name = req.query.name || null;
        let products = req.query.products || null;
        let searchData = <any>{}
        if(name){
            searchData["name"] = name;
        }
        if(products)
        {
            searchData["products"] = products;
        }
        const queryData = {
            data: searchData || null,
            option: {
                page: page,
                limit: limit,
                sort: { field: "desc", created_at: -1 },
            }
        }
        const serviceData = await getServiceWithQuery(queryData);
        const {docs, ...pageData} = serviceData;
        let data = <any>{}
        data["data"] = docs;
        data["pageData"] = pageData;
        success(data, res);
    } 
    catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}

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
};

export const getService = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.query.id as string;
        const service = await ServiceModel.findById(id);
        if(!service)
        {
            return badRequest("Service Not Found!", res, 404);
        }
        return success(service, res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}