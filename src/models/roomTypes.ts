import { paginate } from "mongoose-paginate-v2";
import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const RoomTypesScheme = NewScheme({
  name: { type: String },
  imageUrl: { type: String },
  maxPeople: { type: String },
  decscription: { type: String },
});

export const RoomTypesModel = mongoose.model("RoomTypes", RoomTypesScheme);

export const getRoomTypes = () => RoomTypesModel.find();
export const getRoomTypesById = async (id: String) => {
  return RoomTypesModel.findOne({ _id: id });
};

export const getRoomTypesByName = async (name: string) => {
  return RoomTypesModel.findOne({ name });
};

export const getRoomTypesWithQuery = async (query: any) =>
  (RoomTypesModel as any).paginate(query.data, query.option);

export const createRoomTypes = async (value: Record<string, any>) => {
  new RoomTypesModel(value).save().then((RoomTypes: any) => {
    return RoomTypes.toObject();
  });
};

export const deleteRoomTypesById = async (id: String) => {
  return RoomTypesModel.findOneAndDelete({ _id: id });
};

export const updateRoomTypesById = async (
  id: String,
  data: Record<string, any>
) => {
  return RoomTypesModel.findOneAndUpdate({ _id: id }, data);
};
