import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addUser, deleteUserbyId, getUser, getUserById, updateUserById, UserModel } from "../../models/user";

export const createUser = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const { fullName,department, email, phoneNumber, address, dateOfBirth, roleID, userName, password } = req.body;
        const existUser = await getUser(userName, phoneNumber,email);
        if(existUser)
        {
            return badRequest("Existing User!", res);
        }
        const userData = {
            fullName,
            department,
            email,
            userName,
            password,
            phoneNumber,
            address,
            dateOfBirth,
            roleID
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
        const { id, fullName, department, email, userName, password, phoneNumber, address, dateOfBirth, roleID } = req.body;
        const existUser = await getUserById(id as string);
        if(!existUser)
        {
            return badRequest("User Not Found!", res, 404);
        }
        const data = {
            id,
            fullName,
            department,
            email,
            userName,
            password,
            phoneNumber,
            address,
            dateOfBirth,
            roleID
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
        if(!existUser)
        {
            return badRequest("User Not Found!", res, 404);
        }
        const deleteQuery = await deleteUserbyId(id as string);
        return success("", res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
};

export const getUserWithId = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.query.id as string;
        const user = await UserModel.findById(id);
        if(!user)
        {
            return badRequest("User Not Found!", res, 404);
        }
        return success(user, res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);
    }
}