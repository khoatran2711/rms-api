import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const RoleScheme = NewScheme({
    name: { type: String },
    serviceID: { type: [String] },
  });

export const RoleModel = <any>mongoose.model("Role", RoleScheme);

export const getRoles = async() => RoleModel.find();
export const getRoleById = async (id: String) => {
    RoleModel.findOne({ id });
};

export const getRoleWithQuery = async (query: any) => RoleModel.paginate(query.data,query.option)

export const createRole = async (value: Record<string, any>) => {
  new RoleModel(value).save().then((role:any) => {
    return role.toObject();
  });
};

export const deleteRolebyId = async (id: String) => {
    RoleModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: String, data: Record<string, any>) => {
    RoleModel.findOneAndUpdate({ _id: id }, data);
};