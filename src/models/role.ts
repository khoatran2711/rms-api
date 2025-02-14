import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const RoleScheme = NewScheme({
    name: { type: String },
    permission  : { type: [String] },
  });

export const RoleModel = mongoose.model("Role", RoleScheme);

export const getRoles = async() => RoleModel.find({name: {
  $ne: 'admin'
}});
export const getRoleById = async (id: String) => {
  return RoleModel.findOne({_id:id});
};

export const getRoleWithQuery = async (query: any) => (RoleModel as any).paginate(query.data,query.option)

export const createRole = async (value: Record<string, any>) => {
  new RoleModel(value).save().then((role:any) => {
    return role.toObject();
  });
};

export const deleteRolebyId = async (id: String) => {
    RoleModel.findOneAndDelete({ _id: id });
};
export const updateRoleById = async (id: String, data: Record<string, any>) => {
    RoleModel.findOneAndUpdate({ _id: id }, data);
};
