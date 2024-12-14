import { badRequest, success } from "../../helpers/res.helper";
import { getRoles, createRole, updateRoleById, getRoleById, deleteRolebyId } from '../../models/role';
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
    const { name, permission } = req.body;

    const roleData = {
      name,
      permission,
    };
    if(!name ) {
      return badRequest("Missing required Name!", res, 400);
    }
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
    const { id, name, permission } = req.body;

    const data = {
      id,
      name,
      permission,
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
    success([roleData], res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
}
export const deleteRole = async ( req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id;
    const roleData = await getRoleById(id as string);
    if(!roleData) {
      return badRequest("Role Not Found!", res, 404);
    }
    const deleteRequest = await deleteRolebyId(id as string);
    success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
}
export const getRolePermission = async ( req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id;
    const roleData = await getRoleById(id as string);
    if(!roleData) {
      return badRequest("Role Not Found!", res, 404);
    }
    success(roleData.permission, res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
}