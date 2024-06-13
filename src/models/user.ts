import { error } from "console";
import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  userName: { type: String, required: [true, 'User Name is required']},
  email: { type: String, required: [true, 'Email is required']},
  password: { type: String, required: [true, 'Pass is required']},
});
export const UserModel = mongoose.model("User", UserScheme);

export const getUsers = () => UserModel.find();
export const getUserWithEmail = (email: String) => UserModel.findOne({ email });
export const getUserById = async (id: String) => {
  UserModel.findOne({ id });
};
export const createUser = async (value: Record<string, any>) => {
  new UserModel(value).save()
  .then((user) => {
    return user.toObject();
  })

};
export const deleteUserbyId = async (id: String) => {
  UserModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (
  id: String,
  data: Record<string, any>
) => {
  UserModel.findOneAndUpdate({ _id: id },data);
};
