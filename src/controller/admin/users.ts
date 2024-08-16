import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addUser, getUser, getUserById } from "../../models/user";

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
