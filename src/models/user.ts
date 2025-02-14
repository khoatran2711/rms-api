import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const UserScheme = NewScheme({
  userName: { type: String },
  avatar: { type: String },
  email: { type: String },
  password: { type: String },
  fullName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: String },
  roleID: { type: String, ref: "Role" },
})
export const UserModel = mongoose.model("User", UserScheme);

export const getUsers = () => UserModel.find({roleID: {$ne: '67580b736a7950b83e9558bc'}});
export const getUserWithEmail = (email: String) => UserModel.findOne({ email });
export const getUserById = async (id: String) => {
  return UserModel.findOne({_id:id});
};

export const getUser = async (userName: string, phoneNumber: string, email: string) => {
  return UserModel.findOne({ 
  $or: [ {userName}, {phoneNumber}, {email}] });
};

export const getUserWithQuery = async (query: any) => (UserModel as any).paginate(query.data, query.option)

export const addUser = async (value: Record<string, any>) => {
  new UserModel(value).save().then((user: any) => {
    return user.toObject();
  });
};
export const deleteUserbyId = async (id: String) => {
  return UserModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: string, data: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ _id: id }, data);
};
