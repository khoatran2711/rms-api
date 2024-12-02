import { badRequest, success } from "helpers/res.helper";
import { getRoles, createRole, updateRoleById, getRoleById } from 'models/role';
import express from "express";

export const listRole = async (req: express.Request, res: express.Response) => {
  try {
    const roleData = await getRoles();
    success(roleData, res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
export const createNewRole = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description } = req.body;

    const roleData = {
      name,
      description,
    };
    const addNewQuery = await createRole(roleData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
export const updateRole = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, name, description } = req.body;

    const data = {
      id,
      name,
      description,
    };
    const role = await updateRoleById(id as string, data);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
export const getRole = async ( req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id;
    const roleData = await getRoleById(id as string);
    success(roleData, res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
}