import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import {
  createRoomTypes,
  deleteRoomTypesById,
  getRoomTypesById,
  getRoomTypesByName,
  getRoomTypesWithQuery,
  RoomTypesModel,
  updateRoomTypesById,
} from "./../../models/roomTypes";

export const listRoomType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.page);
    let name = req.query.name || null;
    let searchData = <any>{};
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
    const roomTypeData = await getRoomTypesWithQuery(queryData);
    const { docs, ...pageData } = roomTypeData;
    let data = <any>{};
    data["data"] = docs;
    data["pageData"] = pageData;

    success(data, res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const createRoomType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, maxPeople, imageUrl, decscription } = req.body;
    const existRoomType = await getRoomTypesByName(name);
    if (existRoomType) {
      return badRequest("Existing roomType!", res);
    }
    const roomTypeData = {
      name,
      maxPeople,
      imageUrl,
      decscription,
    };
    const addNewQuery = await createRoomTypes(roomTypeData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const updateRoomType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, name, maxPeople, imageUrl, decscription } = req.body;
    const existRoomType = await getRoomTypesById(id as string);
    console.log(existRoomType)
    if (!existRoomType) {
      return badRequest("RoomType Not Found!", res, 404);
    }
    const data = {
      id,
      maxPeople,
      imageUrl,
      name,
      decscription,
    };
    const roomtype = await updateRoomTypesById(id as string, data);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const deleteRoomType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id;
    const existRoomType = await getRoomTypesById(id as string);
    if (!existRoomType) {
      return badRequest("RoomType Not Found!", res, 404);
    }
    const deleteQuery = await deleteRoomTypesById(id as string);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const getRoomType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id as string;
    const roomtype = await RoomTypesModel.findById(id);
    if (!roomtype) {
      return badRequest("RoomType Not Found!", res, 404);
    }
    return success([roomtype], res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
