import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const UserScheme = NewScheme({
  userName: { type: String },
  email: { type: String },
  password: { type: String },
  fullName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: String },
  roleID: { type: String },
})
export const UserModel = mongoose.model("User", UserScheme);

export const getUsers = () => UserModel.find();
export const getUserWithEmail = (email: String) => UserModel.findOne({ email });
export const getUserById = async (id: String) => {
  UserModel.findOne({_id:id});
};
export const getUserByQuery = (query: any) => (UserModel as any).paginate(query.data,query.option);

export const createUser = async (value: Record<string, any>) => {
  new UserModel(value).save().then((user: any) => {
    return user.toObject();
  });
};
export const deleteUserbyId = async (id: String) => {
  UserModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: String, data: Record<string, any>) => {
  UserModel.findOneAndUpdate({ _id: id }, data);
};
