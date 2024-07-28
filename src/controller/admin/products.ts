import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addProduct, deleteProductbyId, getProductById, getProductsByName, updateProductbyId } from "./../../models/product";

export const createProduct = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, decscription, price } = req.body;
        const existProduct = await getProductsByName(name);
        if(existProduct) {
            return badRequest("Existing room !", res);
        }
        const productsData = {
            name,
            decscription,
            price
        };
        const addNewQuery = await addProduct(productsData);
        return success("", res);
    }
    catch (error) {
        return badRequest("Internal server !", res, 500);
    }
}

export const updateProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id, name, decscription, price } = req.body;
        const existProduct = await getProductById(id);
        if(!existProduct) 
        {
            return badRequest("Product Not Found !", res, 404);
        }
        const data = {
            id,
            name,
            decscription,
            price
        }
        const product = await updateProductbyId(id, data);
        return success("", res);
    }
    catch (error) 
    {
        return badRequest("Internal server !", res, 500);
    }
}
