import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import {
  addProduct,
  deleteProductbyId,
  getProductById,
  getProductsByName,
  getProductWithQuery,
  ProductModel,
  updateProductbyId,
} from "./../../models/product";

export const listProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.page);
    let name = req.query.name || null;
    let serviceID = req.query.serviceID || null;
    let searchData = <any>{};
    if (serviceID) {
      searchData["serviceID"] = serviceID;
    }
    if (name) {
      searchData["name"] = name;
    }
    const queryData = {
      data: searchData || null,
      option: {
        page: page,
        limit: limit,
        sort: { field: "desc", created_at: -1 },
      },
    };
    const productData = await getProductWithQuery(queryData);
    const { docs, ...pageData } = productData;
    let data = <any>{};
    data["data"] = docs;
    data["pageData"] = pageData;

    success(data, res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};
export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, decscription, price, imgUrl, serviceID } = req.body;
    const existProduct = await getProductsByName(name);
    if (existProduct) {
      return badRequest("Existing product !", res);
    }
    const productsData = {
      name,
      decscription,
      price,
      imgUrl,
      serviceID,
    };
    const addNewQuery = await addProduct(productsData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, name, decscription, price } = req.body;
    const existProduct = await getProductById(id as string);
    if (!existProduct) {
      return badRequest("Product Not Found !", res, 404);
    }
    const data = {
      id,
      name,
      decscription,
      price,
    };
    const product = await updateProductbyId(id as string, data);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id;
    const existProduct = await getProductById(id as string);
    if (!existProduct) {
      return badRequest("Product Not Found !", res, 404);
    }
    const deleteQuery = await deleteProductbyId(id as string);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const getProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id as string;
    const product = await ProductModel.findById(id);
    if (!product) {
      return badRequest("Product Not Found !", res, 404);
    }
    return success([product], res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};
