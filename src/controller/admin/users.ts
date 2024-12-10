import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import {
  addUser,
  deleteUserbyId,
  getUser,
  getUserById,
  getUsers,
  getUserWithQuery,
  updateUserById,
  UserModel,
} from "../../models/user";
import { encode } from "../../helpers";

export const listUser = async (req: express.Request, res: express.Response) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.page);
    let userName = req.query.userName || null;
    let phoneNumber = req.query.phoneNumber || null;
    let roleID = req.query.roleID || null;
    let email = req.query.email || null;
    let searchData = <any>{};
    
    if (roleID) searchData["roleID"] = roleID;
    if (userName) searchData["userName"] = userName;
    if (phoneNumber) searchData["phoneNumber"] = phoneNumber;
    if (email) searchData["email"] = email;

    const queryData = {
      data: {...searchData, roleID: { $ne: "67580b736a7950b83e9558bc" }},
      option: {
        page: page,
        limit: limit,
        sort: { field: "desc", created_at: -1 },
      },
    };

    // const userData = await getUserWithQuery(queryData);
    // const { docs, ...pageData } = userData;
    // let data = <any>{};
    // data["data"] = docs;
    // data["pageData"] = pageData;
    const userData = await getUsers();
    const data = userData.reverse();
    success(data, res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      fullName,
      avatar,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      roleID,
      userName,
      password,
    } = req.body;
    const existUser = await getUser(userName, phoneNumber, email);
    if (existUser) {
      return badRequest("Existing User!", res);
    }
    const hasspassword = await encode(password);
    const userData = {
      avatar,
      fullName,
      email,
      userName,
      password: hasspassword,
      phoneNumber,
      address,
      dateOfBirth,
      roleID,
    };
    const addNewQuery = await addUser(userData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      id,
      fullName,
      avatar,
      email,
      userName,
      phoneNumber,
      address,
      dateOfBirth,
      roleID,
    } = req.body;
    const existUser = await getUserById(id as string);
    if (!existUser) {
      return badRequest("User Not Found!", res, 404);
    }
    const data = {
      id,
      fullName,
      avatar,
      email,
      userName,
      phoneNumber,
      address,
      dateOfBirth,
      roleID,
    };
    const user = await updateUserById(id as string, data);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id;
    const existUser = await getUserById(id as string);
    if (!existUser) {
      return badRequest("User Not Found!", res, 404);
    }
    const deleteQuery = await deleteUserbyId(id as string);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};

export const getUserWithId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id as string;
    const user = await UserModel.findById(id);
    if (!user) {
      return badRequest("User Not Found!", res, 404);
    }
    return success([user], res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
